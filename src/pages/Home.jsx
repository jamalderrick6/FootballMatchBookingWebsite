import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import Carousel from 'react-bootstrap/Carousel';
import Header from '../components/Home/Header.jsx';
import Testmonials from '../components/Home/Testmonials.jsx';
import CopyRights from '../components/Home/CopyRights.jsx';
import Contact from '../components/Home/Contact.jsx';
import Opinion from '../components/Home/Opinion.jsx';

const Home = () => {
	return (
		<>
			<Header />
			<Testmonials />
			<Opinion />
			<Contact />
			<CopyRights />
		</>
	);
};

export default Home;
