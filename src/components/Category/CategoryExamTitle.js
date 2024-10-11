import React, { Component } from 'react';
import './CategoryExamTitle.scss';

class CategoryExamTitle extends Component {
    render() {
        const { categories } = this.props;
        return (
            <div className="category-exam-container">
                {categories && categories.length > 0 ? (
                    categories.map((category) => (
                        <button key={category.id} className="category-exam-button">
                            {category.titleCategoryExams}
                        </button>
                    ))
                ) : (
                    <div>No categories available</div> // Thông báo nếu không có danh mục
                )}
            </div>
        );
    }
}

export default CategoryExamTitle;
