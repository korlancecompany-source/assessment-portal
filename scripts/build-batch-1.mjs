import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

export const batch1Questions = {
  "Full Stack Web Development": [
    {
      id: "FSWD-01",
      question: "Which HTML5 semantic element is most appropriate for containing the primary site navigation links?",
      options: {
        A: "<nav>",
        B: "<header>",
        C: "<menu>",
        D: "<section>"
      },
      correct: "A"
    },
    {
      id: "FSWD-02",
      question: "What does the HTTP status code 404 indicate to a client?",
      options: {
        A: "The client lacks valid authentication credentials",
        B: "The requested resource could not be found on the server",
        C: "The server encountered an unhandled internal exception",
        D: "The request method is not supported for this endpoint"
      },
      correct: "B"
    },
    {
      id: "FSWD-03",
      question: "In JavaScript ES6, how does Promise.all() behave when one of the promises rejects?",
      options: {
        A: "It waits for all other promises to resolve and ignores the rejection",
        B: "It retries the rejected promise up to three times automatically",
        C: "It rejects immediately with the reason of the first rejected promise",
        D: "It resolves with an array containing the rejection error object"
      },
      correct: "C"
    },
    {
      id: "FSWD-04",
      question: "Which CSS Flexbox property controls the alignment of items along the main axis?",
      options: {
        A: "align-items",
        B: "align-content",
        C: "flex-flow",
        D: "justify-content"
      },
      correct: "D"
    },
    {
      id: "FSWD-05",
      question: "What is the primary role of the package-lock.json file in a Node.js project?",
      options: {
        A: "To lock the exact dependency versions and dependency tree for reproducible installs",
        B: "To encrypt production credentials before deploying to a hosting provider",
        C: "To list only optional packages that are excluded during production build",
        D: "To define executable shell scripts and shortcuts for the npm CLI"
      },
      correct: "A"
    },
    {
      id: "FSWD-06",
      question: "Which React hook is designed for memoizing an expensive calculation between component renders?",
      options: {
        A: "useCallback",
        B: "useMemo",
        C: "useRef",
        D: "useReducer"
      },
      correct: "B"
    },
    {
      id: "FSWD-07",
      question: "In JavaScript, what characterizes a closure?",
      options: {
        A: "An object method that cannot access the 'this' keyword",
        B: "An immediately invoked function expression used to declare global constants",
        C: "A syntax construct that prevents asynchronous code from executing concurrently",
        D: "A function bundled together with references to its surrounding lexical scope"
      },
      correct: "D"
    },
    {
      id: "FSWD-08",
      question: "Which HTTP request method is semantically intended for partial updates to an existing resource?",
      options: {
        A: "PUT",
        B: "POST",
        C: "PATCH",
        D: "UPDATE"
      },
      correct: "C"
    },
    {
      id: "FSWD-09",
      question: "What is the key functional difference between relational SQL and document-based NoSQL databases?",
      options: {
        A: "SQL databases strictly prohibit ACID transaction compliance",
        B: "NoSQL databases require predefined static schemas before any record insertion",
        C: "SQL uses structured tables with schemas, while document NoSQL stores schema-flexible JSON-like documents",
        D: "NoSQL systems run exclusively in memory and cannot write data to persistent disk"
      },
      correct: "C"
    },
    {
      id: "FSWD-10",
      question: "In Express.js, what is the purpose of the third parameter 'next' in a middleware function?",
      options: {
        A: "To terminate the Node.js server process when an error occurs",
        B: "To pass control to the next middleware function in the request-response stack",
        C: "To jump directly to the browser and close the network socket",
        D: "To restart the route handler with initial request headers"
      },
      correct: "B"
    },
    {
      id: "FSWD-11",
      question: "Which Git command creates a new branch named 'feature' and immediately switches your working directory to it?",
      options: {
        A: "git branch -d feature",
        B: "git merge feature --new",
        C: "git commit -b feature",
        D: "git switch -c feature"
      },
      correct: "D"
    },
    {
      id: "FSWD-12",
      question: "What happens when you pass an empty dependency array to React's useEffect hook?",
      options: {
        A: "The effect runs on every single render of the component",
        B: "The effect runs only once after the initial component mount",
        C: "The effect is permanently skipped and will never run",
        D: "The effect causes an immediate infinite re-render loop"
      },
      correct: "B"
    },
    {
      id: "FSWD-13",
      question: "In web security, what vulnerability occurs when an attacker injects malicious client-side scripts into viewed pages?",
      options: {
        A: "Cross-Site Scripting (XSS)",
        B: "Structured Query Injection (SQLi)",
        C: "Denial of Service (DoS)",
        D: "Insecure Direct Object Reference (IDOR)"
      },
      correct: "A"
    },
    {
      id: "FSWD-14",
      question: "In CSS Grid, which property is used to define the explicit track sizes for columns?",
      options: {
        A: "grid-column-gap",
        B: "grid-auto-columns",
        C: "grid-template-columns",
        D: "grid-direction"
      },
      correct: "C"
    },
    {
      id: "FSWD-15",
      question: "What does the Node.js Event Loop do when executing JavaScript code?",
      options: {
        A: "Spawns an independent OS thread for every single arithmetic calculation",
        B: "Continuously checks call stacks and task queues to handle asynchronous operations on a single thread",
        C: "Translates high-level JavaScript code into C++ source files before execution",
        D: "Pauses all operating system background tasks until the web page loads"
      },
      correct: "B"
    },
    {
      id: "FSWD-16",
      question: "Which HTTP status code is most appropriate when a resource is successfully created via a POST request?",
      options: {
        A: "200 OK",
        B: "202 Accepted",
        C: "204 No Content",
        D: "201 Created"
      },
      correct: "D"
    },
    {
      id: "FSWD-17",
      question: "What is the primary purpose of the CORS protocol in modern web browsers?",
      options: {
        A: "To compress incoming image assets before rendering them on the canvas",
        B: "To allow or restrict resources requested from another domain outside the origin domain",
        C: "To cache static stylesheets inside the local browser storage indefinitely",
        D: "To automatically generate SSL certificates for frontend applications"
      },
      correct: "B"
    },
    {
      id: "FSWD-18",
      question: "Which keyword in modern JavaScript allows declaring block-scoped variables that can be reassigned?",
      options: {
        A: "let",
        B: "const",
        C: "var",
        D: "static"
      },
      correct: "A"
    },
    {
      id: "FSWD-19",
      question: "In RESTful API design, what does idempotency mean for an HTTP method?",
      options: {
        A: "The method can only be executed when the user has administrator privileges",
        B: "Making multiple identical requests produces the same server state as making a single request",
        C: "The endpoint returns responses exclusively in binary protocol format",
        D: "The client must establish a persistent WebSocket connection prior to sending"
      },
      correct: "B"
    },
    {
      id: "FSWD-20",
      question: "In React, how should state updates that depend on the previous state value be handled?",
      options: {
        A: "By directly mutating the component's state property",
        B: "By reading from window.localStorage synchronously",
        C: "By passing an updater callback function to the state setter",
        D: "By wrapping the state variable in a global JavaScript closure"
      },
      correct: "C"
    }
  ],

  "Python with Data Science": [
    {
      id: "PYDS-01",
      question: "Which Pandas function is used to load tabular data from a comma-separated values file into a DataFrame?",
      options: {
        A: "pd.read_csv()",
        B: "pd.load_csv()",
        C: "pd.parse_csv()",
        D: "pd.open_table()"
      },
      correct: "A"
    },
    {
      id: "PYDS-02",
      question: "In NumPy, what is broadcasting?",
      options: {
        A: "Transmitting array data over socket networks to worker clusters",
        B: "A mechanism that allows arithmetic operations on arrays of different shapes",
        C: "Writing matrix values directly to disk without loading into RAM",
        D: "Converting floating-point values into 8-bit integers automatically"
      },
      correct: "B"
    },
    {
      id: "PYDS-03",
      question: "Which Python structure provides concise syntax to create a list based on an existing iterable?",
      options: {
        A: "Lambda pipeline",
        B: "Generator closure",
        C: "List comprehension",
        D: "Tuple generator"
      },
      correct: "C"
    },
    {
      id: "PYDS-04",
      question: "In Pandas, which method groups DataFrame rows sharing identical column values to compute aggregate statistics?",
      options: {
        A: "df.pivot()",
        B: "df.aggregate_by()",
        C: "df.cluster()",
        D: "df.groupby()"
      },
      correct: "D"
    },
    {
      id: "PYDS-05",
      question: "In scikit-learn, which module function splits dataset arrays into random train and test subsets?",
      options: {
        A: "train_test_split",
        B: "partition_dataset",
        C: "cross_validation_split",
        D: "sample_train_test"
      },
      correct: "A"
    },
    {
      id: "PYDS-06",
      question: "What differentiates a Python generator function from a conventional function?",
      options: {
        A: "Generators always execute within dedicated multi-core worker threads",
        B: "Generators yield values lazily one at a time using the yield statement",
        C: "Generators cannot accept input arguments or parameter defaults",
        D: "Generators are strictly compiled into machine assembly ahead of runtime"
      },
      correct: "B"
    },
    {
      id: "PYDS-07",
      question: "Which Pandas DataFrame method replaces NaN and missing values with a designated scalar value or strategy?",
      options: {
        A: "df.dropna()",
        B: "df.impute()",
        C: "df.fillna()",
        D: "df.clean()"
      },
      correct: "C"
    },
    {
      id: "PYDS-08",
      question: "In NumPy, what values are extracted when slicing an array of integers 0 through 9 using start 2, stop 8, and step 2?",
      options: {
        A: "Values 2, 4, 6, and 8",
        B: "Values 2, 3, 4, 5, 6, and 7",
        C: "Values 3, 5, and 7",
        D: "Values 2, 4, and 6"
      },
      correct: "D"
    },
    {
      id: "PYDS-09",
      question: "Which Matplotlib Pyplot command renders and displays active figure windows on screen?",
      options: {
        A: "plt.show()",
        B: "plt.render()",
        C: "plt.display()",
        D: "plt.draw_all()"
      },
      correct: "A"
    },
    {
      id: "PYDS-10",
      question: "In scikit-learn, what method is called on a trained estimator to generate predicted labels for unseen features?",
      options: {
        A: "estimator.transform()",
        B: "estimator.predict()",
        C: "estimator.evaluate()",
        D: "estimator.score()"
      },
      correct: "B"
    },
    {
      id: "PYDS-11",
      question: "What is a decorator in Python?",
      options: {
        A: "A special class variable used solely to format terminal log colors",
        B: "A syntax keyword that forces garbage collection of unused variables",
        C: "A callable that takes another function as input and extends its behavior without modifying it",
        D: "A compiler flag that turns dynamic type checking off for performance"
      },
      correct: "C"
    },
    {
      id: "PYDS-12",
      question: "Which statistical measure of central tendency is least sensitive to extreme outlier values in a distribution?",
      options: {
        A: "Arithmetic Mean",
        B: "Variance",
        C: "Standard Deviation",
        D: "Median"
      },
      correct: "D"
    },
    {
      id: "PYDS-13",
      question: "Which Pandas function combines two DataFrames along a designated key column, similar to a database join?",
      options: {
        A: "pd.merge()",
        B: "pd.concat()",
        C: "pd.append()",
        D: "pd.stack()"
      },
      correct: "A"
    },
    {
      id: "PYDS-14",
      question: "In scikit-learn preprocessing, which transformer scales feature values to zero mean and unit variance?",
      options: {
        A: "MinMaxScaler",
        B: "StandardScaler",
        C: "RobustScaler",
        D: "Normalizer"
      },
      correct: "B"
    },
    {
      id: "PYDS-15",
      question: "In a Python dictionary, what is returned by dict.get(key, default) if the specified key is absent?",
      options: {
        A: "It raises an uncaught KeyError",
        B: "It returns an empty string always",
        C: "It returns the supplied default value",
        D: "It creates the key with a null value"
      },
      correct: "C"
    },
    {
      id: "PYDS-16",
      question: "Which Matplotlib function is designed specifically to visualize the distribution of continuous numerical data using bins?",
      options: {
        A: "plt.scatter()",
        B: "plt.bar()",
        C: "plt.pie()",
        D: "plt.hist()"
      },
      correct: "D"
    },
    {
      id: "PYDS-17",
      question: "In NumPy, what operation is computed by the matrix multiplication operator '@' between two conformable 2D arrays?",
      options: {
        A: "Matrix dot product",
        B: "Element-wise multiplication",
        C: "Outer cross product",
        D: "Kronecker summation"
      },
      correct: "A"
    },
    {
      id: "PYDS-18",
      question: "Which method in Pandas reorganizes and summarizes data across rows and columns with aggregation?",
      options: {
        A: "df.melt()",
        B: "df.pivot_table()",
        C: "df.transpose()",
        D: "df.flatten()"
      },
      correct: "B"
    },
    {
      id: "PYDS-19",
      question: "Which supervised machine learning algorithm classifies data points based on the majority class among nearest neighbors?",
      options: {
        A: "Linear Regression",
        B: "K-Means",
        C: "K-Nearest Neighbors",
        D: "Principal Component Analysis"
      },
      correct: "C"
    },
    {
      id: "PYDS-20",
      question: "In Python, which built-in function returns both the index and value while iterating over a sequence?",
      options: {
        A: "range()",
        B: "zip()",
        C: "map()",
        D: "enumerate()"
      },
      correct: "D"
    }
  ],

  "Data Science": [
    {
      id: "DS-01",
      question: "What is the primary difference between supervised and unsupervised machine learning?",
      options: {
        A: "Supervised learning uses labeled training targets, while unsupervised learning discovers patterns from unlabeled data",
        B: "Supervised learning runs only on CPU, while unsupervised learning requires GPUs",
        C: "Supervised learning cannot be applied to numerical data",
        D: "Unsupervised learning requires ground truth labels for loss computation"
      },
      correct: "A"
    },
    {
      id: "DS-02",
      question: "In predictive modeling, what does high variance in a model typically indicate?",
      options: {
        A: "The model is underfitting the training data due to high simplicity",
        B: "The model is overfitting the training data and capturing noise",
        C: "The model has zero prediction error on unseen test data",
        D: "The learning rate is too small for gradient descent convergence"
      },
      correct: "B"
    },
    {
      id: "DS-03",
      question: "Which evaluation metric represents the proportion of true positives among all instances predicted as positive?",
      options: {
        A: "Recall",
        B: "Accuracy",
        C: "Precision",
        D: "Specificity"
      },
      correct: "C"
    },
    {
      id: "DS-04",
      question: "What is the purpose of cross-validation in a machine learning workflow?",
      options: {
        A: "To encrypt model weights for secure cloud deployment",
        B: "To eliminate the need for hyperparameter tuning",
        C: "To compress large training datasets into smaller formats",
        D: "To evaluate model generalizability by training and testing on multiple data partitions"
      },
      correct: "D"
    },
    {
      id: "DS-05",
      question: "Which technique is commonly used to reduce the dimensionality of a feature space while preserving maximum variance?",
      options: {
        A: "Principal Component Analysis (PCA)",
        B: "One-Hot Encoding",
        C: "Polynomial Feature Expansion",
        D: "Min-Max Normalization"
      },
      correct: "A"
    },
    {
      id: "DS-06",
      question: "What problem occurs during gradient descent when gradients become exponentially small as they propagate backward?",
      options: {
        A: "Exploding gradients problem",
        B: "Vanishing gradients problem",
        C: "Deadlock synchronization failure",
        D: "Memory allocation overflow"
      },
      correct: "B"
    },
    {
      id: "DS-07",
      question: "In binary classification with extreme class imbalance, which metric is generally preferred over standard accuracy?",
      options: {
        A: "Mean Squared Error",
        B: "R-Squared Score",
        C: "Area Under the ROC Curve (AUC-ROC)",
        D: "Sum of Squared Residuals"
      },
      correct: "C"
    },
    {
      id: "DS-08",
      question: "What is the primary effect of adding L1 regularization (Lasso) to a linear regression model?",
      options: {
        A: "It enforces that all coefficients remain strictly positive",
        B: "It scales feature values between zero and one",
        C: "It squares every prediction residual before loss calculation",
        D: "It drives less important feature coefficients to exactly zero, enabling feature selection"
      },
      correct: "D"
    },
    {
      id: "DS-09",
      question: "Which metric measures the linear relationship between two continuous variables, ranging from -1 to +1?",
      options: {
        A: "Pearson correlation coefficient",
        B: "Euclidean distance",
        C: "Gini impurity index",
        D: "Chi-square contingency value"
      },
      correct: "A"
    },
    {
      id: "DS-10",
      question: "In decision trees, what criterion measures the probability of a randomly chosen element being incorrectly labeled?",
      options: {
        A: "Cosine similarity",
        B: "Gini Impurity",
        C: "F1 Score",
        D: "Root Mean Squared Error"
      },
      correct: "B"
    },
    {
      id: "DS-11",
      question: "What is the primary role of an activation function in an artificial neural network?",
      options: {
        A: "To normalize inputs to have unit variance",
        B: "To prevent gradient backpropagation across epochs",
        C: "To introduce non-linearity, allowing the network to learn complex patterns",
        D: "To automatically split the dataset into mini-batches"
      },
      correct: "C"
    },
    {
      id: "DS-12",
      question: "Which clustering algorithm identifies dense clusters separated by regions of low density and handles noise points?",
      options: {
        A: "K-Means Clustering",
        B: "Hierarchical Agglomerative Clustering",
        C: "Linear Discriminant Analysis",
        D: "DBSCAN"
      },
      correct: "D"
    },
    {
      id: "DS-13",
      question: "In hypothesis testing, what does a p-value less than the chosen significance level alpha signify?",
      options: {
        A: "Reject the null hypothesis in favor of the alternative hypothesis",
        B: "Accept the null hypothesis as definitively proven true",
        C: "The test statistic is invalid and data must be re-collected",
        D: "The sample size is too large for valid parametric inference"
      },
      correct: "A"
    },
    {
      id: "DS-14",
      question: "What is data leakage in machine learning modeling?",
      options: {
        A: "Loss of precision when converting float64 arrays to float32",
        B: "When information from outside the training dataset is inadvertently used to train the model",
        C: "Physical exfiltration of database files over unsecured connections",
        D: "Dropping rows containing missing values during data cleaning"
      },
      correct: "B"
    },
    {
      id: "DS-15",
      question: "Which ensemble technique combines predictions from multiple independently trained decision trees via majority voting or averaging?",
      options: {
        A: "Support Vector Classification",
        B: "Naive Bayes Classifier",
        C: "Random Forest",
        D: "K-Nearest Neighbors"
      },
      correct: "C"
    },
    {
      id: "DS-16",
      question: "What does the Central Limit Theorem state regarding the sampling distribution of the sample mean?",
      options: {
        A: "All underlying populations must follow a normal distribution",
        B: "Sample variance is always equal to population standard deviation",
        C: "The mean of any sample is identical to the median of that sample",
        D: "The distribution of sample means approaches normality as sample size increases, regardless of population shape"
      },
      correct: "D"
    },
    {
      id: "DS-17",
      question: "Which encoding method is most appropriate for a nominal categorical feature with no intrinsic ordering?",
      options: {
        A: "One-Hot Encoding",
        B: "Ordinal Integer Encoding",
        C: "Min-Max Scaling",
        D: "Logarithmic Power Transformation"
      },
      correct: "A"
    },
    {
      id: "DS-18",
      question: "In regression modeling, what does an R-squared value of 0.85 indicate?",
      options: {
        A: "The model produces 85 false positives per 100 samples",
        B: "85% of the variance in the dependent variable is explained by the independent variables",
        C: "The regression slope has a p-value equal to 0.85",
        D: "The dataset has an 85% probability of containing outliers"
      },
      correct: "B"
    },
    {
      id: "DS-19",
      question: "What is the primary purpose of the elbow method in K-Means clustering analysis?",
      options: {
        A: "To measure the accuracy of class labels on test data",
        B: "To determine the optimal learning rate for stochastic gradient descent",
        C: "To help determine the optimal number of clusters K by plotting inertia",
        D: "To identify collinear features before training"
      },
      correct: "C"
    },
    {
      id: "DS-20",
      question: "Which sampling strategy is designed to balance class distributions by creating synthetic minority class instances?",
      options: {
        A: "Random Majority Undersampling",
        B: "Stratified K-Fold Split",
        C: "Bootstrap Aggregation",
        D: "SMOTE (Synthetic Minority Over-sampling Technique)"
      },
      correct: "D"
    }
  ],

  "Data Analytics": [
    {
      id: "DA-01",
      question: "What type of data analytics focuses on answering the question 'What happened in the past'?",
      options: {
        A: "Descriptive Analytics",
        B: "Predictive Analytics",
        C: "Prescriptive Analytics",
        D: "Diagnostic Analytics"
      },
      correct: "A"
    },
    {
      id: "DA-02",
      question: "In SQL, which clause filters aggregated query results produced by a GROUP BY statement?",
      options: {
        A: "WHERE",
        B: "HAVING",
        C: "QUALIFY",
        D: "FILTER"
      },
      correct: "B"
    },
    {
      id: "DA-03",
      question: "Which statistical chart displays the five-number summary: minimum, first quartile, median, third quartile, and maximum?",
      options: {
        A: "Scatter Plot",
        B: "Histogram",
        C: "Box and Whisker Plot",
        D: "Pareto Chart"
      },
      correct: "C"
    },
    {
      id: "DA-04",
      question: "In relational data modeling, what is a surrogate key?",
      options: {
        A: "A foreign key that connects more than two tables simultaneously",
        B: "A key constructed by hashing personal identifying information",
        C: "A natural key derived directly from business domain attributes",
        D: "An artificially created unique identifier with no intrinsic business meaning"
      },
      correct: "D"
    },
    {
      id: "DA-05",
      question: "What does the 80/20 Pareto Principle imply in business sales analytics?",
      options: {
        A: "Approximately 80% of outcomes or revenues frequently come from 20% of causes or customers",
        B: "Every dataset must contain at least 80% numeric and 20% string attributes",
        C: "Data cleaning accounts for exactly 80% of an analyst's total computational budget",
        D: "Analytic dashboards should display 80 charts on desktop and 20 on mobile"
      },
      correct: "A"
    },
    {
      id: "DA-06",
      question: "In SQL, which join type returns all rows from the left table and only matched rows from the right table?",
      options: {
        A: "INNER JOIN",
        B: "LEFT OUTER JOIN",
        C: "FULL OUTER JOIN",
        D: "CROSS JOIN"
      },
      correct: "B"
    },
    {
      id: "DA-07",
      question: "What is an analytical dashboard KPI primarily used for in an enterprise organization?",
      options: {
        A: "To compile database query execution plans into machine instructions",
        B: "To track and evaluate performance against critical business objectives",
        C: "To validate network bandwidth throughput across remote offices",
        D: "To automatically back up tabular databases to physical magnetic tape"
      },
      correct: "B"
    },
    {
      id: "DA-08",
      question: "In data warehouse architecture, what characterizes a Star Schema?",
      options: {
        A: "A central fact table linked directly to multiple de-normalized dimension tables",
        B: "A completely normalized database schema with no foreign keys",
        C: "A single flat text file containing unstructured event logs",
        D: "A hierarchy where dimension tables are broken down into sub-dimensions"
      },
      correct: "A"
    },
    {
      id: "DA-09",
      question: "Which data visualization is most effective for demonstrating part-to-whole proportions with few categories?",
      options: {
        A: "Time Series Line Graph",
        B: "Donut or Pie Chart",
        C: "Geospatial Heatmap",
        D: "Scatter Plot with Trendline"
      },
      correct: "B"
    },
    {
      id: "DA-10",
      question: "In statistical analysis, what is the Interquartile Range (IQR)?",
      options: {
        A: "The difference between the maximum value and the minimum value",
        B: "The sum of the mean and standard deviation",
        C: "The difference between the 75th percentile (Q3) and the 25th percentile (Q1)",
        D: "The ratio of the sample standard error to the sample size"
      },
      correct: "C"
    },
    {
      id: "DA-11",
      question: "What is the primary purpose of an ETL pipeline in business intelligence?",
      options: {
        A: "To encrypt local files before emailing them to clients",
        B: "To extract data from diverse sources, transform it into business logic, and load it into a destination warehouse",
        C: "To convert SQL databases into JavaScript web applications",
        D: "To schedule employee shift rosters across time zones"
      },
      correct: "B"
    },
    {
      id: "DA-12",
      question: "In spreadsheet analysis, which function searches vertically for a specified value in the first column of a table and returns a value from another column?",
      options: {
        A: "INDEX_MATCH",
        B: "HLOOKUP",
        C: "SUMPRODUCT",
        D: "VLOOKUP"
      },
      correct: "D"
    },
    {
      id: "DA-13",
      question: "What is cohort analysis frequently utilized for in customer retention analytics?",
      options: {
        A: "Tracking behavioral metrics of user groups that share common characteristics over time",
        B: "Measuring server memory usage during peak shopping hours",
        C: "Splitting database records across multiple SSD drives",
        D: "Encrypting credit card numbers in compliance with PCI standards"
      },
      correct: "A"
    },
    {
      id: "DA-14",
      question: "In SQL, what is the effect of using the DISTINCT keyword in a SELECT statement?",
      options: {
        A: "Sorts the output rows in random order",
        B: "Eliminates duplicate rows from the query output",
        C: "Limits query execution to a maximum of 100 milliseconds",
        D: "Converts all numerical values into text strings"
      },
      correct: "B"
    },
    {
      id: "DA-15",
      question: "Which metric calculates the percentage of customers who stop subscribing to or purchasing a service during a specified period?",
      options: {
        A: "Conversion Rate",
        B: "Net Promoter Score",
        C: "Churn Rate",
        D: "Customer Acquisition Cost"
      },
      correct: "C"
    },
    {
      id: "DA-16",
      question: "In exploratory data analysis, what indicates a right-skewed (positively skewed) distribution?",
      options: {
        A: "The mean is typically greater than the median",
        B: "The mean and median are completely identical",
        C: "The distribution has two distinct equal peak modes",
        D: "The long tail of the distribution extends towards lower values"
      },
      correct: "A"
    },
    {
      id: "DA-17",
      question: "In SQL window functions, which function assigns a unique sequential integer to rows starting from 1 within each partition?",
      options: {
        A: "RANK()",
        B: "ROW_NUMBER()",
        C: "DENSE_RANK()",
        D: "NTILE()"
      },
      correct: "B"
    },
    {
      id: "DA-18",
      question: "What is a major danger of treating correlation as causation in analytics reporting?",
      options: {
        A: "It inflates the memory size of database tables",
        B: "It forces charts to render in black and white",
        C: "It leads to erroneous policy decisions by assuming one variable directly causes change in another",
        D: "It causes SQL syntax parsing exceptions in the database"
      },
      correct: "C"
    },
    {
      id: "DA-19",
      question: "Which type of chart is ideal for visualizing relationship and correlation between two numerical variables across many records?",
      options: {
        A: "Stacked Bar Chart",
        B: "Pie Chart",
        C: "Gantt Chart",
        D: "Scatter Plot"
      },
      correct: "D"
    },
    {
      id: "DA-20",
      question: "In time-series analytics, what is seasonality?",
      options: {
        A: "A predictable, repeating pattern or fluctuation occurring at regular calendar intervals",
        B: "An unexpected one-time server failure during data ingestion",
        C: "A steady long-term upward or downward movement spanning decades",
        D: "Random measurement error caused by sensor noise"
      },
      correct: "A"
    }
  ]
}

// Function to update questions.json and answer_key.csv for a batch
export function applyBatch(batchData) {
  const qPath = join(root, 'src', 'data', 'questions.json')
  const akPath = join(root, 'answer_key.csv')

  const questions = JSON.parse(readFileSync(qPath, 'utf8'))
  const akLines = readFileSync(akPath, 'utf8').trim().split('\n')
  const akMap = new Map()

  for (let i = 1; i < akLines.length; i++) {
    const [id, correct] = akLines[i].split(',').map(s => s.trim())
    if (id && correct) akMap.set(id, correct)
  }

  for (const [courseName, qList] of Object.entries(batchData)) {
    // Strip correct field for questions.json
    questions[courseName] = qList.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options
    }))

    // Update answer key
    for (const q of qList) {
      akMap.set(q.id, q.correct)
    }
  }

  writeFileSync(qPath, JSON.stringify(questions, null, 2), 'utf8')

  const newAkRows = ['id,correct']
  for (const [id, correct] of akMap.entries()) {
    newAkRows.push(`${id},${correct}`)
  }
  writeFileSync(akPath, newAkRows.join('\n') + '\n', 'utf8')

  console.log(`Applied batch for ${Object.keys(batchData).join(', ')}`)
}

if (process.argv[1] && process.argv[1].endsWith('build-batch-1.mjs')) {
  applyBatch(batch1Questions)
}
