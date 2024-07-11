import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Resource from './components/SelectedResource';
import Login from './components/Login'
import NoMatch from './components/NoMatch'
import PasswordReset from './components/PasswordReset';
import ForgotPassword from './components/ForgotPassword';
import AddCoordinator from './adminflow/AddCoordinator';
import CoordinatorsList from './adminflow/CoordinatorsList';
import { RefreshProvider } from './components/RefreshContext';
import UpdateCoordinator from './adminflow/UpdateCoordinator';

function App() {
	return (
		<div>
		<Router>
			<RefreshProvider>
			<Routes>
				<Route index element={<Login />} />
				<Route path="/dashboard" element={<Resource />}/>
				<Route path="/coordinators/new" element={<AddCoordinator />}/>
				<Route path="/coordinators/list" element={<CoordinatorsList />}/>
				<Route path="/coordinators/update" element={<UpdateCoordinator />} />
				<Route path="/password-reset" element={<PasswordReset />}/>
				<Route path="/forgot-password" element={<ForgotPassword />}/>
				<Route path="*" element={<NoMatch />} />
			</Routes>
			</RefreshProvider>
		</Router>
		{/* <footer className="fixed-bottom">
			<div className="p-3 text-center bg-white">
			<div>
				<span className="fs-4 text-danger">
				<b>Resource</b>{" "}
				</span>{" "}
				v0.1.0
			</div>
			<div>by Developers Cell Somaiya</div>
			</div>
		</footer> */}
		</div>
	);
}

export default App;