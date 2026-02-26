import { useEffect, useState } from "react";
import axios from "axios";

export default function RawData() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const limit = 5;

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/sensor-data?page=${page}&limit=${limit}`)
            .then((res) => {
                setData(res.data.data);
                setTotal(res.data.total);   // 👈 important for pagination sync
            })
            .catch((err) => {
                console.log(err);
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
                            <th>Temperature</th>
                            <th>Humidity</th>
                            <th>Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="5">No data found</td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <span className="topic-tag">
                                            {item.topic}
                                        </span>
                                    </td>

                                    <td
                                        className={
                                            item.temperature > 80 ? "violated" : ""
                                        }
                                    >
                                        {item.temperature}
                                    </td>

                                    <td>{item.humidity}</td>

                                    <td>
                                        {new Date(item.timestamp).toLocaleString()}
                                    </td>
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