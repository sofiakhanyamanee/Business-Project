import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import BaseLayout from "./components/BaseLayout";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import { CustomerContext } from "./contexts/CustomerContext";

function App() {
  const [customerList, setCustomerList] = useState([]);

  return (
    <div>
      <CustomerContext.Provider value={{ customerList, setCustomerList }}>
        <Switch>
          <Route
            path="/customer/:id"
            render={(props) => {
              return (
                <BaseLayout>
                  <CustomerDetailPage {...props} />
                </BaseLayout>
              );
            }}
          ></Route>

          <Route path="/home">
            <BaseLayout>
              <HomePage />
            </BaseLayout>
          </Route>

          <Route path="/login">
            <BaseLayout>
              <LoginPage />
            </BaseLayout>
          </Route>

          <Route exact path="/">
            <BaseLayout>
              <RegisterPage />
            </BaseLayout>
          </Route>
        </Switch>
      </CustomerContext.Provider>
    </div>
  );
}

export default App;
