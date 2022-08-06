import { useEffect, useState } from 'react';
import { Form } from './components/Form/Form';
import { Content } from './components/Content/Content';
import { Modal } from './components/Modal/Modal';
import { API } from './constants';

import './normalize.css';
import './App.css';

export const App = () => {
  const [data, setData] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [modal, setModal] = useState(false);
  const [parameters, setParameters] = useState({ region: '', city: '', organization: '' });

  const getData = async (url = '') => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      } else {
        console.error('Ошибка запроса к серверу');
        return null;
      }
    } catch (error) {
      console.error('Ошибка:', error);
      return null;
    }
  };

  const sortVacancies = async () => {
    const tempArray = [];

    data.forEach(el => {
      if (parameters.organization !== '0') {
        if (
          el.regionname === parameters.region &&
          el.placetitle === parameters.city &&
          el.clientname === parameters.organization
        ) {
          tempArray.push(el);
        }
      } else {
        if (
          el.regionname === parameters.region &&
          el.placetitle === parameters.city
        ) {
          tempArray.push(el);
        }
      }
    });

    setSorted(tempArray);
  };

  useEffect(() => {
    getData(API.vacancies).then((result) => {
      if (result.length) {
        setData(result);
        console.clear();
        console.log(result);
      }
    });
  }, []);

  useEffect(() => {
    sortVacancies();
  }, [parameters]);

  return (
    <main>
      <Form data={data} setParameters={setParameters} />
      <Content data={sorted} setModal={setModal} />
      {modal && <Modal setModal={setModal} />}
    </main>
  );
};
