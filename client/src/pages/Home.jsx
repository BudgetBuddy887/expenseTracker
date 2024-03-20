import {
        Accordion,
        AccordionItem,
        AccordionButton,
        AccordionPanel,
        AccordionIcon,
        Box,
        Text,
        Heading,
        ChakraProvider,Container,
        Stack,
        HStack,
        useColorModeValue,
        Image,
        Skeleton,
} from "@chakra-ui/react";

const Home = () => {
    return (
      <ChakraProvider>
<Box backgroundColor='tomato' />
        <Container maxW="5xl" px={{ base: 6, md: 3 }} py={10}>
            <Stack direction={{ base: 'column-reverse', md: 'row' }}>
                <Stack direction="column" spacing={6}>
                <Heading
                    as="h3"
                    size="lg"
                    fontWeight="bold"
                    textAlign="right"
                    maxW={{ base: '100%', md: '480px' }}
                > Welcome to BudgetBuddy
                </Heading>
                <Text
                    color={useColorModeValue('gray.700', 'gray.400')}
                    fontSize="1.2rem"
                    textAlign="right"
                    lineHeight="1.375"
                    fontWeight="300"
                    casing="full-wid"
                    maxW={{ base: '100%', md: '470px' }}
                >
                    Start your journey to fiscal wellbeing today! Using this service, you'll
                    be able to easily track all your outgoing funds, whether it's your electricity
                    bill or a trip to the cinema. By setting regular outgoings and your spending
                    goals on the Budget page, you'll be able to track your progress as you log your
                    outgoing funds through the Expenses page. Log in or sign up to get saving!
                </Text>
                <HStack spacing={3}>
                    
                </HStack>
                <HStack spacing={5} justify={"flex-end"}>
                    {['100% Free', 'Easy to use'].map((text, index) => (
                    <HStack spacing={2} key={index}>
                        <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid meet"
                        >
                        <path
                            d="M6.97665 13.425C6.90165 13.425 6.82665 13.425 6.67665 13.425C6.30165 13.35 6.00165 13.125 5.85165 12.825L4.05165 10.2C3.90165 9.975 3.90165 9.6 4.20165 9.45C4.27665 9.375 4.42665 9.375 4.50165 9.375C4.65165 9.375 4.87665 9.45 4.95165 9.6L6.82665 12.225C6.90165 12.3 6.90165 12.3 6.97665 12.3C6.97665 12.3 6.97665 12.3 7.05165 12.3C7.12665 12.3 7.12665 12.3 7.20165 12.225C7.20165 12.225 7.27665 12.225 7.27665 12.15L13.2017 4.725C13.2767 4.575 13.5017 4.5 13.6517 4.5C13.8017 4.5 13.8767 4.575 14.0267 4.65C14.1767 4.725 14.2517 4.875 14.2517 5.025C14.2517 5.175 14.2517 5.325 14.1017 5.475L8.25165 12.9C8.17665 12.975 8.02665 13.125 7.95165 13.2C7.50165 13.35 7.27665 13.425 6.97665 13.425Z"
                            fill="#66C789"
                        ></path>
                        <path
                            d="M9 18C4.05 18 0 13.95 0 9C0 4.05 4.05 0 9 0C13.95 0 18 4.05 18 9C18 13.95 13.95 18 9 18ZM9 1.125C4.65 1.125 1.125 4.65 1.125 9C1.125 13.35 4.65 16.875 9 16.875C13.35 16.875 16.875 13.35 16.875 9C16.875 4.65 13.35 1.125 9 1.125Z"
                            fill="#66C789"
                        ></path>
                        </svg>
                        <Text fontSize="xs">{text}</Text>
                    </HStack>
                    ))}
                </HStack>
                </Stack>
                <Box ml={{ base: 0, md: 5 }}>
                <Image
                    w="100%"
                    h="100%"
                    minW={{ base: 'auto', md: '30rem' }}
                    objectFit="cover"
                    src="https://images.pexels.com/photos/7063776/pexels-photo-7063776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Man writes in ledger, with piggy-bank and coins on desk"
                    rounded="md"
                    fallback={<Skeleton />}
                />
                </Box>
            </Stack>
            </Container>

        <Container maxW="5xl" px={{ base: 6, md: 3 }} py={10}>
          <Heading as='h3' size='lg'>How to manage expenses and budget</Heading>
          <Text>
            Managing budgets and expenses efficiently is crucial for personal or
            organizational financial health. Here are 12 key tips on how to manage
            budgets, expenses, and related financial matters effectively:
          </Text>
        

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
        </Container>
    </ChakraProvider>
  );
};

export default Home;