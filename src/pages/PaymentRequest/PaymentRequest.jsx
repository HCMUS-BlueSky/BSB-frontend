import React, { useEffect, useReducer } from "react";
import Navbar from "../../components/Navbar";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import RequestList from "../../components/PaymentRequest/RequestList";
import { formatCurrency } from "../../utils/formatCurrency";
import PopUpNewDebtReminder from "../../components/PopUp/PopUpNewDebtReminder";
import { getAccount } from "../../apis/services/Account";
import "./PaymentRequest.css";
import { getAllRemind } from "../../apis/services/Remind";
import Loading from "../../components/Loading/Loading";
import CompletedList from "../../components/PaymentRequest/CompletedList";

const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_ACCOUNT: "SET_ACCOUNT",
  SET_DEBT_REMINDERS: "SET_DEBT_REMINDERS",
  TOGGLE_REQUEST_LIST: "TOGGLE_REQUEST_LIST",
  TOGGLE_COMPLETED_LIST: "TOGGLE_COMPLETED_LIST",
  SET_SORT_REQUEST: "SET_SORT_REQUEST",
  SET_SORT_COMPLETED: "SET_SORT_COMPLETED",
  TOGGLE_NEW_DEBT_REMINDER: "TOGGLE_NEW_DEBT_REMINDER",
  SET_RELOAD: "SET_RELOAD",
};

const initialState = {
  isRequestListVisible: true,
  isCompletedListVisible: true,
  sortOptionRequestList: "Gần đây nhất",
  sortOptionCompletedList: "Gần đây nhất",
  account: null,
  debtReminders: [],
  showNewDebtReminder: false,
  loading: true,
  reload: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTIONS.SET_ACCOUNT:
      return { ...state, account: action.payload };

    case ACTIONS.SET_DEBT_REMINDERS:
      return { ...state, debtReminders: action.payload };

    case ACTIONS.TOGGLE_REQUEST_LIST:
      return { ...state, isRequestListVisible: !state.isRequestListVisible };

    case ACTIONS.TOGGLE_COMPLETED_LIST:
      return {
        ...state,
        isCompletedListVisible: !state.isCompletedListVisible,
      };

    case ACTIONS.SET_SORT_REQUEST:
      return { ...state, sortOptionRequestList: action.payload };

    case ACTIONS.SET_SORT_COMPLETED:
      return { ...state, sortOptionCompletedList: action.payload };

    case ACTIONS.TOGGLE_NEW_DEBT_REMINDER:
      return { ...state, showNewDebtReminder: !state.showNewDebtReminder };

    case ACTIONS.SET_RELOAD:
      return { ...state, reload: !state.reload };

    default:
      return state;
  }
};

const PaymentRequest = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRemind();
        const accountResponse = await getAccount();

        dispatch({ type: ACTIONS.SET_ACCOUNT, payload: accountResponse.data });

        const reminders = response.data
          .map((item) => {
            const direction =
              item.from._id === accountResponse.data._id
                ? "sent"
                : item.to._id === accountResponse.data._id
                ? "received"
                : null;
            if (direction) {
              return {
                ...item,
                direction,
              };
            }
            return null;
          })
          .filter(Boolean);

        dispatch({ type: ACTIONS.SET_DEBT_REMINDERS, payload: reminders });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    };
    fetchData();
  }, [state.reload]);

  const moneyAnalysis = state.debtReminders.reduce(
    (acc, item) => {
      if (item.status !== "PENDING") return acc;
      if (item.direction === "sent") {
        acc.totalReceived += item.amount;
      } else {
        acc.totalPaid += item.amount;
      }
      return acc;
    },
    { totalReceived: 0, totalPaid: 0 }
  );

  if (state.loading) return <Loading />;

  return (
    <>
      <Navbar />
      <main className="py-3">
        <Container>
          <Row className="justify-content-center mb-4">
            <Col xs={12} md={8}>
              <Card className="shadow-sm p-3">
                <Row className="d-flex justify-content-between p-1">
                  {[
                    { label: "Số dư khả dụng", value: state.account?.balance },
                    {
                      label: "Tổng tiền nhận",
                      value: moneyAnalysis.totalReceived,
                    },
                    {
                      label: "Tổng tiền trả",
                      value: moneyAnalysis.totalPaid,
                      className: "text-danger",
                    },
                  ].map(({ label, value, className = "" }, index) => (
                    <Col
                      key={index}
                      className="d-flex flex-column align-items-center"
                    >
                      <p className="mb-0 text-muted">{label}</p>
                      <h5 className={className}>{formatCurrency(value)}</h5>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-center mb-4">
            <Col xs={12} md={8}>
              <div className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  className="w-auto shadow-sm py-2 text-light"
                  onClick={() =>
                    dispatch({ type: ACTIONS.TOGGLE_NEW_DEBT_REMINDER })
                  }
                >
                  <i className="bi bi-plus me-2"></i> TẠO NHẮC NỢ MỚI
                </Button>
                <PopUpNewDebtReminder
                  setReload={() => dispatch({ type: ACTIONS.SET_RELOAD })}
                  show={state.showNewDebtReminder}
                  handleClose={() =>
                    dispatch({ type: ACTIONS.TOGGLE_NEW_DEBT_REMINDER })
                  }
                />
              </div>
            </Col>
          </Row>

          <RequestList
            setReload={() => dispatch({ type: ACTIONS.SET_RELOAD })}
            requestList={state.debtReminders.filter(
              (item) => item.status === "PENDING"
            )}
            sortOptionRequestList={state.sortOptionRequestList}
            toggleRequestList={() =>
              dispatch({ type: ACTIONS.TOGGLE_REQUEST_LIST })
            }
            isRequestListVisible={state.isRequestListVisible}
            handleSortRequestChange={(value) =>
              dispatch({ type: ACTIONS.SET_SORT_REQUEST, payload: value })
            }
          />

          <CompletedList
            completedList={state.debtReminders.filter(
              (item) => item.status === "FULFILLED"
            )}
            sortOptionCompletedList={state.sortOptionCompletedList}
            toggleCompletedList={() =>
              dispatch({ type: ACTIONS.TOGGLE_COMPLETED_LIST })
            }
            isCompletedListVisible={state.isCompletedListVisible}
            handleSortCompletedChange={(value) =>
              dispatch({ type: ACTIONS.SET_SORT_COMPLETED, payload: value })
            }
          />
        </Container>
      </main>
    </>
  );
};

export default PaymentRequest;
