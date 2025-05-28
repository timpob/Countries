import React from 'react';
import AuthorPhoto from '../imgs/photo_2025-05-11_21-05-36.jpg';
import './AuthorInfo.css';

const AuthorInfo = () => {
    return (
        <div className='author'>
            <img src={AuthorPhoto} alt="Author" className="author-photo"/>
            <div>Hi, im Tim</div>
            <div className="author-info">
                <div className="author-links">
                    <a href="https://www.linkedin.com/in/pobolov-tymur" target="_blank" rel="noopener noreferrer" className="author-link">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn"/>
                       
                    </a>
                    <a href="mailto:timurpobolov2003@gmail.com" className="author-link">
                        <img src="https://cdn-icons-png.flaticon.com/512/3178/3178158.png" alt="Email"/>
                    
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AuthorInfo;