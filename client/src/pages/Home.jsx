import { Box, Text, Heading, ListItem, OrderedList } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box px={10} py={10}>
      <Heading>How to manage expenses and budget</Heading>
      <Text>
        Managing budgets and expenses efficiently is crucial for personal or
        organizational financial health. Here are some tips on how to manage
        budgets, expenses, and related financial matters effectively:
      </Text>
      <OrderedList>
        <ListItem>
          <Text fontWeight="700">Create a Budget</Text>
          <Text>
            Start by creating a comprehensive budget that outlines your income
            and expenses. Identify fixed expenses (e.g., rent, utilities) and
            variable expenses (e.g., groceries, entertainment). Allocate a
            portion of your income to savings and investments.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="700">Track Your Expenses</Text>
          <Text>
            Keep track of your expenses regularly. Use tools like spreadsheets,
            budgeting apps, or financial software to record your spending.
            Categorize expenses to better understand where your money is going.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="700">Set Financial Goals</Text>
          <Text>
            Define short-term and long-term financial goals. Whether it's saving
            for a vacation, buying a house, or building an emergency fund,
            setting specific, measurable goals will help you stay motivated and
            focused.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="700">Prioritize Spending</Text>
          <Text>
            Review your expenses and identify areas where you can cut back.
            Prioritize essential expenses and consider eliminating or reducing
            discretionary spending. Be mindful of impulse purchases and
            unnecessary subscriptions.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="700">Use Enveloping Method</Text>
          <Text>
            Allocate cash for different spending categories and keep them in
            separate envelopes. This method can help you stay within budget and
            avoid overspending in specific areas.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="700">Automate Savings</Text>
          <Text>
            Set up automatic transfers from your checking account to savings or
            investment accounts. This ensures consistent savings and removes the
            temptation to spend money that should be saved.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="700">Review and Adjust</Text>
          <Text>
            Regularly review your budget and expenses to track your progress.
            Adjust your budget as needed based on changes in income, expenses,
            or financial goals.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="700">Emergency Fund</Text>
          <Text>
            Build an emergency fund to cover unexpected expenses or financial
            emergencies. Aim to save enough to cover 3-6 months of living
            expenses.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="700">Avoid Debt</Text>
          <Text>
            Minimize the use of high-interest debt such as credit cards. If you
            have existing debt, prioritize paying it off aggressively to reduce
            interest payments and improve your financial health.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="700">Seek Professional Advice</Text>
          <Text>
            Consider consulting with a financial advisor or planner for
            personalized advice on budgeting, investing, retirement planning,
            and other financial matters.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="700">Educate Yourself</Text>
          <Text>
            Take the time to learn about personal finance and investment
            principles. Resources such as books, online courses, and financial
            websites can help you make informed decisions and build financial
            literacy.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="700">Stay Disciplined</Text>
          <Text>
            Financial management requires discipline and consistency. Stick to
            your budget, avoid impulsive decisions, and stay focused on your
            long-term financial goals.
          </Text>
        </ListItem>
      </OrderedList>
    </Box>
  );
};

export default Home;
