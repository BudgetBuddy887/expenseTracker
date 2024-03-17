import React from 'react';
import Col from 'react-bootstrap/Col';

export default function Footer() {
    return (
        <footer style={{ backgroundColor: 'grey', textAlign: 'center', padding: '10px' }}>
            <Col>
                <a href="https://github.com/BudgetBuddy887/expenseTracker" alt="abcd" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github" style={{ color: 'black', fontSize: '2em', margin: '5px' }}></i>
                </a>{" "}
            </Col>           
        </footer>
    )
}