import React from 'react';
import Col from 'react-bootstrap/Col';
import githubLogo from '../assets/github-mark-white.png';

export default function Footer() {
    return (
        <footer style={{ color: 'white', backgroundColor: 'grey', textAlign: 'center', padding: '10px'}} class="fixed-bottom">
            <Col>
            <div>
                <h6>BudgetBuddy ©2024</h6>
            </div>
            <div>
                <a href="https://github.com/BudgetBuddy887/expenseTracker" alt="GitHubLogo" target="_blank" rel="noopener noreferrer">
                <img className="footer-icons" width={40} src={githubLogo} alt="GitHubLogo"/>
                </a>{" "}
            </div>
            </Col>           
        </footer>
    )
}