import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Login from '../pages/Login';
import PermissionScreen from '../pages/PermissionScreen';
import ProductScreen from '../pages/ProductScreen';
import EditProductScreen from '../pages/EditProductScreen';
import VariationScreen from '../pages/VariationScreen';
import AddNewUserScreen from '../pages/AddNewUserScreen';
import CategoryScreen from '../pages/CategoryScreen';
import AdddNewShopScreen from '../pages/AddNewShopScreen';
import ShopScreen from '../pages/shopScreen';
import AddNewCategoryScreen from '../pages/AddNewCategoryScreen';
import SubCategoryScreen from '../pages/SubCategoryScreen';
import AddNewSubCategoryScreen from '../pages/AddNewSubCategoryScreen';
import AddProductScreen from '../pages/AddNewProductscreen';
import useUserInfo from '../pages/useToken';

const Routes = () => {
  const { user, setUser } = useUserInfo();

  return (
    <Switch>
      <PrivateRoute path="/" exact component={Dashboard} />

      <PrivateRoute path="/users" component={Users} />

      <Route
        exact
        path="/login"
        render={({ match, history }) => (
          <Login
            match={match}
            history={history}
            user={user}
            setUser={setUser}
          />
        )}
      ></Route>

      <PrivateRoute
        path="/permissions/:id"
        exact
        component={PermissionScreen}
      />
      <PrivateRoute path="/products" exact component={ProductScreen} />

      <PrivateRoute path="/addproduct" exact component={AddProductScreen} />

      <PrivateRoute path="/product/:id" exact component={EditProductScreen} />

      <PrivateRoute
        path="/variations/:id/:variationId"
        exact
        component={VariationScreen}
      />

      <PrivateRoute path="/variations/:id" exact component={VariationScreen} />
      <PrivateRoute path="/addnewuser" exact component={AddNewUserScreen} />
      <PrivateRoute path="/edituser/:id" exact component={AddNewUserScreen} />
      <PrivateRoute path="/categories" exact component={CategoryScreen} />

      <PrivateRoute
        path="/addnewcategory"
        exact
        component={AddNewCategoryScreen}
      />
      <PrivateRoute
        path="/editcategory/:id"
        exact
        component={AddNewCategoryScreen}
      />

      <PrivateRoute path="/subcategories" exact component={SubCategoryScreen} />
      <PrivateRoute
        path="/addnewsubcategory"
        exact
        component={AddNewSubCategoryScreen}
      />

      <PrivateRoute
        path="/editsubcategory/:"
        exact
        component={AddNewSubCategoryScreen}
      />

      <PrivateRoute path="/shop" exact component={ShopScreen} />
      <PrivateRoute path="/addnewshop" exact component={AdddNewShopScreen} />
      <PrivateRoute path="/editshop/:id" exact component={AdddNewShopScreen} />
    </Switch>
  );
};

export default Routes;
