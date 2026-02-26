import { useEffect, useState } from "react";
import axios from "axios";

export default function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const limit = 5;

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/alerts?page=${page}&limit=${limit}`)
            .then((res) => {
                setAlerts(res.data.data);
                setTotal(res.data.total);   
            })
            .catch((err) => {
                console.log("Error fetching alerts:", err);
            });
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="page">

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Device</th>
                            <th>Violation</th>
                            <th>Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {alerts.length === 0 ? (
                            <tr>
                                <td colSpan="4">No alerts found</td>
                            </tr>
                        ) : (
                            alerts.map((alert) => (
                                <tr key={alert.id}>
                                    <td>
                                        <span className="topic-tag">
                                            {alert.topic}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="alert-badge">
                                            {alert.violated_keys}
                                        </span>
                                    </td>
                                    <td>{alert.timestamp}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Prev
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}