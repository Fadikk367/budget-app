import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';

import { ListItem, List } from './BudgetTransactionList.css'

import { formatCurrency, formatDate } from 'utils';

const BudgetTransactionList = ({ 
  transactions, allCategories, selectedParentCategoryId, budgetCategories
}) => {
  const filteredTransactionsBySelectedParentCategory = useMemo(
    () => {
      if (typeof selectedParentCategoryId === 'undefined') {
        return transactions;
      }

      if (selectedParentCategoryId === null) {
        return transactions.filter(transaction => {
          const hasBudgetCategory = budgetCategories
            .some(butgetCategory => butgetCategory.categoryId === transaction.categoryId)

          return !hasBudgetCategory;
        })
      }

      return transactions.filter(transaction => {
        try {
          const category = allCategories
            .find(category => category.id === transaction.categoryId);
    
          const parentCategoryName = category.parentCategory.name;
    
          return parentCategoryName === selectedParentCategoryId;
        } catch(err) {
          return false;
        }
      });
    },
    [allCategories, budgetCategories, selectedParentCategoryId, transactions]
  );



  const groupedTransactions = useMemo(
    () => groupBy(
      filteredTransactionsBySelectedParentCategory,
      transaction => new Date(transaction.date).getUTCDate()
    ),
    [filteredTransactionsBySelectedParentCategory]
  );

  return (
    <List>
      {Object.entries(groupedTransactions).map(([key, transactions]) => (
        <li>
          <ul key={key}>
            {transactions.map(transaction => (
              <ListItem key={transaction.id}>
                <div>{transaction.description}</div>
                <div>{formatCurrency(transaction.amount)}</div>
                <div>{formatDate(transaction.date)}</div>
                <div>
                  {(allCategories.find(category => category.id === transaction.categoryId) || {}).name}
                </div>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  )
}

export default connect(state => ({
    transactions: state.budget.budget.transactions,
    butgetCategories: state.budget.budgetCategories,
    allCategories: state.common.allCategories,
    selectedParentCategoryId: state.budget.selectedParentCategoryId
}))(BudgetTransactionList);


