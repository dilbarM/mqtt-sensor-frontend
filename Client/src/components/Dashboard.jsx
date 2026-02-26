import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalMessages: 0,
        totalAlerts: 0,
        activeDevices: 0
    });

    const [latestReadings, setLatestReadings] = useState([]);
    const [recentAlerts, setRecentAlerts] = useState([]);

    const fetchData = async () => {
        try {
            const sensorRes = await axios.get( "http://127.0.0.1:8000/api/sensor-data?page=1&limit=10");

            const alertsRes = await axios.get( "http://127.0.0.1:8000/api/alerts?page=1&limit=5" );

            const sensorData = sensorRes.data.data;
            const alertsData = alertsRes.data.data;

            const uniqueDevices = [
                ...new Set(sensorData.map(item => item.topic))
            ];

            setStats({
                totalMessages: sensorRes.data.total,
                totalAlerts: alertsRes.data.total,
                activeDevices: uniqueDevices.length
            });

            setLatestReadings(sensorData);
            setRecentAlerts(alertsData);

        } catch (error) {
            console.log("Dashboard error:", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="page">
            <h2 className="page-title">Dashboard</h2>

            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Messages</h3>
                    <p>{stats.totalMessages}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Alerts</h3>
                    <p style={{ color: "#ff4757" }}>
                        {stats.totalAlerts}
                    </p>
                </div>

                <div className="stat-card">
                    <h3>Active Devices</h3>
                    <p style={{ color: "#22c55e" }}>
                        {stats.activeDevices}
                    </p>
                </div>
            </div>

            <div className="two-col">

                <div className="table-container">
                    <h3 style={{ padding: "15px", color: "#00d4ff" }}>
                        Latest Sensor Readings
                    </h3>

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
                            {latestReadings.length === 0 ? (
                                <tr>
                                    <td colSpan="4">No data found</td>
                                </tr>
                            ) : (
                                latestReadings.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <span className="topic-tag">
                                                {item.topic}
                                            </span>
                                        </td>
                                        <td
                                            className={
                                                item.temperature > 80
                                                    ? "violated"
                                                    : ""
                                            }
                                        >
                                            {item.temperature}
                                        </td>
                                        <td>{item.humidity}</td>
                                        <td>
                                            {new Date(
                                                item.timestamp
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Recent Alerts */}
                <div className="table-container">
                    <h3 style={{ padding: "15px", color: "#ff4757" }}>
                        Recent Alerts
                    </h3>

                    <table>
                        <thead>
                            <tr>
                                <th>Device</th>
                                <th>Violation</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAlerts.length === 0 ? (
                                <tr>
                                    <td colSpan="3">No alerts found</td>
                                </tr>
                            ) : (
                                recentAlerts.map(alert => (
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
                                        <td>
                                            {new Date(
                                                alert.timestamp
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}