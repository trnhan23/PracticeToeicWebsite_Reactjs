import React, { Component } from 'react';
import './CategoryExamTitle.scss';

class CategoryExamTitle extends Component {
    render() {
        const { categories } = this.props;
        return (
            <div className="category-exam-container">
                {categories.map((category) => (
                    <button key={category.id} className="category-exam-button">
                        {category.title}
                    </button>
                ))}
            </div>
        );
    }
}

export default CategoryExamTitle;
