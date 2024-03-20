import { Stack, Button, Container } from "react-bootstrap"
import { useState } from 'react'
import { BudgetCard } from "../components/Budgets/BudgetCard"
import { AddBudgetModal } from "../components/Budgets/AddBudgetModal"
import { ViewExpensesModal } from "../components/Budgets/ViewExpensesModal"
import { AddExpenseModal } from "../components/Budgets/AddExpenseModal"
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "../context/BudgetsContext"
import { UncategorizedBudgetCard } from "../components/Budgets/UncategorizedBudgetCard"
import { TotalBudgetCard } from "../components/Budgets/TotalBudgetCard"
export function Budgets() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
    const { budgets, getBudgetExpenses } = useBudgets()

    function openAddExpenseModal(budgetIds) {
        setShowAddExpenseModal(true)
        setAddExpenseModalBudgetId(budgetIds)
    }

    return (
        <>
            <Container className="my-4">
                <Stack direction="horizontal" className="mb-4">
                    <h1 className="me-auto">Budges</h1>
                    <Button variant="primary me-2" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
                    <Button variant="outline-primary" onClick={() => setShowAddExpenseModal(true)}>Add Expense</Button>
                </Stack>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(uto-fill, minmax(300px, 1fr))',
                        gap: '1rem',
                        alignItems: 'flex-start',
                    }}
                >
                    {budgets.map(budget => {
                        const amount = getBudgetExpenses(budget.id).reduce(
                            (total, expense) => total + expense.amount,
                            0
                        )
                        return (
                            <BudgetCard
                                key={budget.id}
                                name={budget.name}
                                amount={amount}
                                max={budget.max}
                                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                            />
                        )
                    })}
                    <UncategorizedBudgetCard
                        onAddExpenseClick={openAddExpenseModal}
                        onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
                    />
                    <TotalBudgetCard />
                </div>

            </Container>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                defaultBudgetId={addExpenseModalBudgetId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpensesModal
                budgetId={viewExpensesModalBudgetId}
                handleClose={() => setViewExpensesModalBudgetId()}
            />
        </>
    )
}
