import './Content.css';

export const Content = ({ data, setModal }) => (
    <div className="content">
        <h2 className="vacancies_count">Найдено вакансий: {data.length}</h2>
        {data.map((vacancy) => (
            <div className="vacancy_card" key={vacancy.vacancy_id}>
                <span className="vacancy_card_city">{vacancy.placetitle}</span>
                <h2 className="vacancy_card_title">{vacancy.proftitle}</h2>
                <hr />
                <span className="vacancy_card_info">{vacancy.salary_volume_ex}</span>
                <span className="vacancy_card_info">{vacancy.directiontitle}</span>
                <span className="vacancy_card_info">{vacancy.clientname}</span>
                <div className="plug"></div>
                <button className='vacancy_card_more'>Подробнее</button>
                <button
                    className='vacancy_card_respond'
                    onClick={() => setModal(true)}
                >
                    Откликнуться!
                </button>
            </div>
        ))}
    </div>
);