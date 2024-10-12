import React, { Component } from 'react';
import './CategoryExamTitle.scss';

class CategoryExamTitle extends Component {

    handleCategoryClick = (id) => {
        this.props.onSelectCategory(id);
    };

    render() {
        const { categories, selectedTitleId } = this.props;
        return (
            <div className="category-exam-container">
                {categories && categories.length > 0 ? (
                    categories.map((category) => (
                        <button
                            key={category.id}
                            className={`category-exam-button ${selectedTitleId === category.id ? 'active' : ''}`}
                            onClick={() => this.handleCategoryClick(category.id)}
                        >
                            {category.titleCategoryExams}
                        </button>
                    ))
                ) : (
                    <div>No categories available</div>
                )}
            </div>
        );
    }
}

export default CategoryExamTitle;
