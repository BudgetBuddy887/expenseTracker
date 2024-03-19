import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    Heading,
    ChakraProvider 
} from "@chakra-ui/react";

const Home = () => {
return (
  <ChakraProvider>
    <Box px={10} py={10}>
      <Heading>How to manage expenses and budget</Heading>
      <Text>
        Managing budgets and expenses efficiently is crucial for personal or
        organizational financial health. Here are 12 key tips on how to manage
        budgets, expenses, and related financial matters effectively:
      </Text>
    </Box>

    <Accordion allowToggle className="accordion">
    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
                1. Create a Budget
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Start by creating a comprehensive budget that outlines your income
                and expenses. Identify fixed expenses (e.g., rent, utilities) and
                variable expenses (e.g., groceries, entertainment). Allocate a
                portion of your income to savings and investments.
        </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
            2. Track Your Expenses
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Keep track of your expenses regularly. Use tools like spreadsheets,
                budgeting apps, or financial software to record your spending.
                Categorize expenses to better understand where your money is going.
        </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
            3. Set Financial Goals
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Define short-term and long-term financial goals. Whether it's saving
                for a vacation, buying a house, or building an emergency fund,
                setting specific, measurable goals will help you stay motivated and
                focused.
        </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
            4. Prioritize Spending
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Review your expenses and identify areas where you can cut back.
                Prioritize essential expenses and consider eliminating or reducing
                discretionary spending. Be mindful of impulse purchases and
                unnecessary subscriptions.
        </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
        5. Use Enveloping Method
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Allocate cash for different spending categories and keep them in
                separate envelopes. This method can help you stay within budget and
                avoid overspending in specific areas.
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
            6. Automate Savings
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Set up automatic transfers from your checking account to savings or
                investment accounts. This ensures consistent savings and removes the
                temptation to spend money that should be saved.
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
            7. Review and Adjust
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Regularly review your budget and expenses to track your progress.
                Adjust your budget as needed based on changes in income, expenses,
                or financial goals.
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
            8. Emergency Fund
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Build an emergency fund to cover unexpected expenses or financial
                emergencies. Aim to save enough to cover 3-6 months of living
                expenses.
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
            9. Avoid Debt
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Minimize the use of high-interest debt such as credit cards. If you
                have existing debt, prioritize paying it off aggressively to reduce
                interest payments and improve your financial health.
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
            10. Seek Professional Advice
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Consider consulting with a financial advisor or planner for
                personalized advice on budgeting, investing, retirement planning,
                and other financial matters.
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
            11. Educate Yourself
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Take the time to learn about personal finance and investment
                principles. Resources such as books, online courses, and financial
                websites can help you make informed decisions and build financial
                literacy.
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <h2>
        <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
            12. Stay Disciplined
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Financial management requires discipline and consistency. Stick to
                your budget, avoid impulsive decisions, and stay focused on your
                long-term financial goals.
        </AccordionPanel>
    </AccordionItem>
    </Accordion>
</ChakraProvider>
);
};

export default Home;