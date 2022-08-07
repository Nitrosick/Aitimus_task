import { useEffect, useState, useRef } from 'react';
import './Form.css';

export const Form = ({ data, setParameters }) => {
    const [regionsList, setRegionsList] = useState([]);
    const [citiesList, setCitiesList] = useState([]);
    const [organizationsList, setOrganizationsList] = useState([]);

    const regionSelect = useRef(null);
    const citySelect = useRef(null);
    const organizationSelect = useRef(null);

    const getRegions = async () => {
        const regions = new Set();

        data.forEach(el => {
            if (el.regionname) regions.add(el.regionname);
        });

        setRegionsList(Array.from(regions).sort());
    };

    const getCities = async (region) => {
        setCitiesList([]);
        setOrganizationsList([]);
        citySelect.current.value = "";
        organizationSelect.current.value = "";

        const cities = new Set();

        data.forEach(el => {
            if (el.placetitle && el.regionname === region) {
                cities.add(el.placetitle);
            }
        });

        setCitiesList(Array.from(cities).sort());
        pushParameters();
    };

    const getOrganizations = async (city) => {
        setOrganizationsList([]);
        organizationSelect.current.value = "";

        const organizations = new Set();

        data.forEach(el => {
            if (el.clientname && el.placetitle === city) {
                organizations.add(el.clientname);
            }
        });

        setOrganizationsList(Array.from(organizations).sort());
        pushParameters();
    };

    const pushParameters = () => {
        setParameters({
            region: regionSelect.current.value,
            city: citySelect.current.value,
            organization: organizationSelect.current.value
        });
    };

    useEffect(() => {
        getRegions();
    }, [data]);

    return (
        <form
            className="form"
            action="#"
            onSubmit={(e) => e.preventDefault()}
        >
            <fieldset className='custom_input'>
                <legend className='custom_input_title'>Регион</legend>
                <input
                    type="text"
                    className='custom_input_field'
                    name="region"
                    id="region"
                    list="regions-list"
                    ref={regionSelect}
                    onChange={(e) => getCities(e.target.value)}
                    placeholder='Выберите регион'
                />
            </fieldset>

            <datalist id="regions-list">
                {regionsList.map((region, idx) => (
                    <option key={idx} value={region} />
                ))}
            </datalist>

            <fieldset className='custom_select'>
                <legend className='custom_select_title'>Город</legend>
                <select
                    className='custom_select_field'
                    name="city"
                    id="city"
                    ref={citySelect}
                    onChange={(e) => getOrganizations(e.target.value)}
                >
                    <option value="">Выберите город</option>

                    {citiesList.map((city, idx) => (
                        <option key={idx} value={city}>{city}</option>
                    ))}
                </select>
            </fieldset>

            <fieldset className='custom_select'>
                <legend className='custom_select_title'>Организация</legend>
                <select
                    className='custom_select_field'
                    name="organization"
                    id="organization"
                    ref={organizationSelect}
                    onChange={(e) => pushParameters()}
                >
                    <option value="">Выберите организацию</option>

                    {organizationsList.map((organization, idx) => (
                        <option key={idx} value={organization}>{organization}</option>
                    ))}
                </select>
            </fieldset>
        </form>
    );
};