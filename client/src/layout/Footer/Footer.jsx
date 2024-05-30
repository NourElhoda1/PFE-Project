import React from 'react';
import './Footer.css';
import logo from '../../assets/logo2.png';

function Footer() {
  return (
    <footer>
        <div class="footer-container">
         
            <div class="footer-company-box">
                <img src={logo} alt="logo" />
            </div>

            <div class="footer-link-box">
                <strong>Main Link's</strong>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Explore</a></li>
                    <li><a href="#">category</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>
            </div>
            <div class="footer-link-box">
                <strong>External Link's</strong>
                <ul>
                    <li><a href="#">Our Product's</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Disclaimer</a></li>
                    <li><a href="#">Trem's and Condition's</a></li>
                </ul>
            </div>

            <div class="footer-link-box">
                <strong>Payment</strong>
                <ul>
                    
                </ul>
            </div>

        </div>

        <div class="footer-bottom">
            <span class="footer-owner">Created with pain</span>
            <span class="copyright">&#169; Copyright 2024 -  NEKHDEM MEAK</span>
        </div>
    </footer>
  )
}

export default Footer