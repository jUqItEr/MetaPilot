import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/statistics/views.module.css'
import React, { useState } from 'react';
import AdminHeader from "../../../layout/admin/header"
import AdminSidebar from "../../../layout/admin/sidebar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';

/**
 * Rendering the blog info page
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 07.
 * @returns
 */

// 그래프
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            display:false,
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
};
const labels = ['23.12.10','23.12.10','23.12.10','23.12.10','23.12.10','23.12.10','23.12.10']; //x축 기준

export const data= {
    labels,
    datasets: [
        {
            label: '분류1',
            data: [1, 2, 3, 4, 5, 6, 100], //실제 그려지는 데이터(Y축 숫자)
            borderColor: '#0d6efd', //그래프 선 color
            backgroundColor: 'rgba(13,110,253,0.5)', //마우스 호버시 나타나는 분류네모 표시 bg
        },
    ],
};
const CustomDatePicker = ({ selectedDate, handleDateChange }) => {
    return (
        <>
            <input
                type="week"
                id="weekInput"
                name="weekInput"
                value={selectedDate}
                onChange={handleDateChange}
                style={{ border: 'none' }}
            />
            <FontAwesomeIcon icon={faAngleRight} className={styles.fortawesomeIcon} />
        </>
    );
};

export default function AdminHashTagPage() {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    return(
        <>
            <Head>
                <title>관리자 페이지</title>
                <meta property='og:title' content='관리자 페이지' key='title'/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div id={styles.wrap}>
                {/*header*/}
                <AdminHeader/>
                <div className="d-flex flex-nowrap">
                    {/*sidebar*/}
                    <AdminSidebar/>
                    {/* content */}
                    <div className={styles.content} >
                        <div className={`${styles.pageTitle} border-bottom`}>
                            <div><span className={styles.pageTitleFont}>조회수</span></div>
                            <div>
                                <FontAwesomeIcon icon={faAngleLeft} className={styles.fortawesomeIcon}/>
                                <input type="date" id="dateInput" name="dateInput" value={selectedDate} onChange={handleDateChange} min="1970-01-01" max={today} style={{border:"none"}}/>
                                <FontAwesomeIcon icon={faAngleRight} className={styles.fortawesomeIcon}/>
                            </div>
                            <div className="input-group" style={{width:'125px'}}>
                                {/*일간*/}
                                <button className="btn btn-primary ps-3 pe-3" type="button" id="btnDay" style={{border:'1px solid white'}}>일간</button>
                                {/*주간*/}
                                {/*<button className="btn btn-primary ps-2 pe-2" type="button" id="btnWeek" style={{border:'1px solid white'}}>주간</button>*/}
                                {/*월간*/}
                                <button className="btn btn-primary ps-3 pe-3" type="button" id="btnMonth" style={{border:'1px solid white'}}>월간</button>
                            </div>
                        </div>
                        <div className= {`${styles.pageContent } border-bottom `}>
                            {/*<Line data={chartData} />*/}
                            <Line options={options} data={data} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};