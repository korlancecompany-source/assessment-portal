import { applyBatch } from './build-batch-1.mjs'

export const batch2Questions = {
  "Cloud Computing": [
    {
      id: "CC-01",
      question: "Which cloud service model provides virtualized computing resources, storage, and networking where the consumer manages the operating system and applications?",
      options: {
        A: "Infrastructure as a Service (IaaS)",
        B: "Platform as a Service (PaaS)",
        C: "Software as a Service (SaaS)",
        D: "Function as a Service (FaaS)"
      },
      correct: "A"
    },
    {
      id: "CC-02",
      question: "In cloud disaster recovery planning, what does Recovery Time Objective (RTO) measure?",
      options: {
        A: "The financial cost incurred per gigabyte of lost production data",
        B: "The maximum acceptable duration of system downtime before service is restored",
        C: "The age of files that must be recovered from backup storage for normal operation",
        D: "The physical distance required between primary and secondary data centers"
      },
      correct: "B"
    },
    {
      id: "CC-03",
      question: "Which storage architecture treats data as discrete units with metadata and unique identifiers, making it ideal for storing unstructured web assets?",
      options: {
        A: "Block Storage",
        B: "File Storage",
        C: "Object Storage",
        D: "Tape Drive Storage"
      },
      correct: "C"
    },
    {
      id: "CC-04",
      question: "What is the primary benefit of deploying applications across multiple cloud Availability Zones (AZs)?",
      options: {
        A: "Elimination of all public internet egress transfer charges",
        B: "Automatic conversion of SQL queries into microservice APIs",
        C: "Ensuring container images compile without dependencies",
        D: "High availability and fault tolerance against isolated data center outages"
      },
      correct: "D"
    },
    {
      id: "CC-05",
      question: "In cloud networking, what is the role of a Virtual Private Cloud (VPC)?",
      options: {
        A: "To provide a logically isolated virtual network dedicated to a specific cloud tenant",
        B: "To store database backups indefinitely at zero storage cost",
        C: "To convert client HTTP traffic into hardware serial signals",
        D: "To automatically purchase spot server instances during price drops"
      },
      correct: "A"
    },
    {
      id: "CC-06",
      question: "What is serverless computing (Function as a Service)?",
      options: {
        A: "Running software applications on personal desktop hardware without internet connection",
        B: "An execution model where the cloud provider manages infrastructure and bills only for runtime consumed",
        C: "Hosting monolithic enterprise applications on dedicated bare-metal servers",
        D: "A database system that does not store any structured or relational data"
      },
      correct: "B"
    },
    {
      id: "CC-07",
      question: "Which mechanism automatically increases or decreases the number of compute instances based on live workload demand?",
      options: {
        A: "Static Provisioning",
        B: "Manual Overclocking",
        C: "Auto-Scaling",
        D: "DNS Forwarding"
      },
      correct: "C"
    },
    {
      id: "CC-08",
      question: "Under the Cloud Shared Responsibility Model, which component is typically the responsibility of the customer in IaaS?",
      options: {
        A: "Physical data center perimeter security and facility cooling",
        B: "Hypervisor hardware maintenance and host OS patching",
        C: "Power supply redundancy for physical rack servers",
        D: "Guest operating system patching and application security configurations"
      },
      correct: "D"
    },
    {
      id: "CC-09",
      question: "What technology delivers content to users from cache servers deployed near their geographic location to reduce latency?",
      options: {
        A: "Content Delivery Network (CDN)",
        B: "Network Address Translator (NAT)",
        C: "Dynamic Host Configuration Protocol (DHCP)",
        D: "Virtual Tape Library (VTL)"
      },
      correct: "A"
    },
    {
      id: "CC-10",
      question: "In Identity and Access Management (IAM), what does the Principle of Least Privilege dictate?",
      options: {
        A: "Granting root administrative credentials to all developers on team onboarding",
        B: "Granting users only the minimal permissions necessary to perform their assigned tasks",
        C: "Allowing anonymous read and write access to all cloud storage buckets",
        D: "Rotating passwords only when an active breach is confirmed by security"
      },
      correct: "B"
    },
    {
      id: "CC-11",
      question: "How does OS-level containerization differ from traditional hardware virtualization?",
      options: {
        A: "Containers require a dedicated hypervisor and full guest operating system per instance",
        B: "Containers cannot run on Linux operating systems",
        C: "Containers share the host operating system kernel, making them lighter and faster to start",
        D: "Virtual machines share RAM directly without memory isolation"
      },
      correct: "C"
    },
    {
      id: "CC-12",
      question: "What cloud migration strategy, commonly called 'Lift and Shift', moves an application to the cloud with zero code modifications?",
      options: {
        A: "Refactoring",
        B: "Repurchasing",
        C: "Retiring",
        D: "Rehosting"
      },
      correct: "D"
    },
    {
      id: "CC-13",
      question: "What is the primary role of a Cloud Load Balancer?",
      options: {
        A: "Distributing incoming network traffic across multiple healthy target instances to optimize throughput",
        B: "Converting static HTML web pages into containerized microservices",
        C: "Compressing hard drive images to reduce cloud storage billing",
        D: "Scanning source code repositories for syntax and formatting errors"
      },
      correct: "A"
    },
    {
      id: "CC-14",
      question: "In cloud operations, what does Recovery Point Objective (RPO) measure?",
      options: {
        A: "The maximum acceptable age of data lost due to a major system disruption",
        B: "The total number of minutes required to reboot a physical server rack",
        C: "The bandwidth speed between user browsers and the edge location",
        D: "The percentage of CPU utilization needed to trigger auto-scaling"
      },
      correct: "A"
    },
    {
      id: "CC-15",
      question: "Which cloud computing model combines private cloud infrastructure with one or more public cloud services?",
      options: {
        A: "Monolithic Cloud",
        B: "Hybrid Cloud",
        C: "Standalone Cloud",
        D: "Local Edge Grid"
      },
      correct: "B"
    },
    {
      id: "CC-16",
      question: "What is multi-tenancy in cloud computing architecture?",
      options: {
        A: "Requiring each employee to possess multiple company email addresses",
        B: "Deploying a separate physical server cluster for every single end user",
        C: "An architecture where a single instance of software serves multiple distinct customer organizations with data isolation",
        D: "Connecting to a cloud database through multiple wireless routers simultaneously"
      },
      correct: "C"
    },
    {
      id: "CC-17",
      question: "Which cloud service allows automated provisioning of infrastructure using declarative configuration files instead of manual console clicks?",
      options: {
        A: "Infrastructure as Code (IaC)",
        B: "Software as a Service (SaaS)",
        C: "Network Attached Storage (NAS)",
        D: "Domain Name System (DNS)"
      },
      correct: "A"
    },
    {
      id: "CC-18",
      question: "What is an Elastic IP address in cloud networking?",
      options: {
        A: "An IP address that changes automatically every 60 seconds",
        B: "A static IPv4 address designed for dynamic cloud computing that can be rapidly remapped to instances",
        C: "An IP address reserved exclusively for database query caching",
        D: "A private MAC address assigned to local wireless printers"
      },
      correct: "B"
    },
    {
      id: "CC-19",
      question: "In cloud databases, what is database sharding?",
      options: {
        A: "Encrypting database table columns using public-key cryptography",
        B: "Deleting rows older than 30 days to save disk space",
        C: "Horizontally partitioning database records across multiple independent database servers",
        D: "Combining all relational tables into a single unindexed spreadsheet file"
      },
      correct: "C"
    },
    {
      id: "CC-20",
      question: "What metric is formally specified in a Cloud Service Level Agreement (SLA) to guarantee system reliability?",
      options: {
        A: "Total lines of server source code written",
        B: "Number of engineers on duty during holidays",
        C: "Color calibration accuracy of monitoring dashboards",
        D: "Service uptime percentage commitment (such as 99.99%)"
      },
      correct: "D"
    }
  ],

  "Cyber Security": [
    {
      id: "CS-01",
      question: "What three foundational principles form the core of the information security CIA triad?",
      options: {
        A: "Confidentiality, Integrity, and Availability",
        B: "Control, Inspection, and Authorization",
        C: "Cryptography, Interception, and Authentication",
        D: "Compliance, Intelligence, and Auditing"
      },
      correct: "A"
    },
    {
      id: "CS-02",
      question: "Which cryptographic algorithm represents a symmetric block cipher widely used for securing data at rest?",
      options: {
        A: "RSA",
        B: "AES (Advanced Encryption Standard)",
        C: "Diffie-Hellman",
        D: "ECC (Elliptic Curve Cryptography)"
      },
      correct: "B"
    },
    {
      id: "CS-03",
      question: "What is the primary difference between symmetric and asymmetric encryption?",
      options: {
        A: "Symmetric uses hardware tokens, while asymmetric uses passwords only",
        B: "Symmetric encryption cannot be decrypted once applied to files",
        C: "Symmetric uses a single shared key, while asymmetric uses a mathematically linked public-private key pair",
        D: "Asymmetric encryption is obsolete and forbidden in modern security protocols"
      },
      correct: "C"
    },
    {
      id: "CS-04",
      question: "What type of attack occurs when an attacker positions themselves between two communicating parties to silently intercept and alter traffic?",
      options: {
        A: "Denial of Service (DoS)",
        B: "Buffer Overflow",
        C: "Cross-Site Request Forgery",
        D: "Man-in-the-Middle (MitM) Attack"
      },
      correct: "D"
    },
    {
      id: "CS-05",
      question: "Which web vulnerability allows attackers to manipulate backend database queries by entering malicious SQL statements into web inputs?",
      options: {
        A: "SQL Injection (SQLi)",
        B: "Broken Object Level Authorization",
        C: "XML External Entity Attack",
        D: "Server-Side Request Forgery"
      },
      correct: "A"
    },
    {
      id: "CS-06",
      question: "What security architecture operates on the principle of 'never trust, always verify' regardless of user location?",
      options: {
        A: "Perimeter Defense Model",
        B: "Zero Trust Architecture",
        C: "Demilitarized Zone (DMZ)",
        D: "Open Network Architecture"
      },
      correct: "B"
    },
    {
      id: "CS-07",
      question: "In authentication systems, which combination exemplifies Multi-Factor Authentication (MFA)?",
      options: {
        A: "A password and a repeated confirmation of the same password",
        B: "A username and an employee identification number",
        C: "A password (something you know) and a time-based authenticator code (something you have)",
        D: "An email address and a mother's maiden name security answer"
      },
      correct: "C"
    },
    {
      id: "CS-08",
      question: "What malicious software encrypts victim files and demands financial payment in exchange for the decryption key?",
      options: {
        A: "Spyware",
        B: "Adware",
        C: "Keylogger",
        D: "Ransomware"
      },
      correct: "D"
    },
    {
      id: "CS-09",
      question: "What essential mathematical property distinguishes a cryptographic hash function from encryption?",
      options: {
        A: "Hashing is a one-way function that cannot be reversed to discover the original input",
        B: "Hashing requires a private key to compute the output digest",
        C: "Hashing doubles the size of the original message file",
        D: "Hashing generates different outputs every time it is run on identical input"
      },
      correct: "A"
    },
    {
      id: "CS-10",
      question: "What is the primary function of a stateful firewall compared to a stateless packet filter?",
      options: {
        A: "It blocks all incoming traffic unconditionally without exception",
        B: "It tracks active connections and evaluates packets in the context of established TCP/UDP sessions",
        C: "It encrypts hard drives on routers using hardware acceleration",
        D: "It generates digital certificates for internal intranet servers"
      },
      correct: "B"
    },
    {
      id: "CS-11",
      question: "In social engineering, what term describes a targeted phishing attack directed specifically against high-profile executives?",
      options: {
        A: "Pharming",
        B: "Vishing",
        C: "Whaling",
        D: "Smishing"
      },
      correct: "C"
    },
    {
      id: "CS-12",
      question: "What is a Denial-of-Service (DoS) attack designed to accomplish against a target organization?",
      options: {
        A: "Exfiltrating employee payroll records silently over DNS",
        B: "Cracking cryptographic passwords through brute-force dictionaries",
        C: "Modifying database records without creating an audit log entry",
        D: "Overwhelming system resources or network links to make services unavailable to legitimate users"
      },
      correct: "D"
    },
    {
      id: "CS-13",
      question: "What central platform collects, aggregates, correlates, and analyzes security event logs across an entire enterprise network?",
      options: {
        A: "Security Information and Event Management (SIEM)",
        B: "Domain Name System Security Extensions (DNSSEC)",
        C: "Simple Network Management Protocol (SNMP)",
        D: "Network Address Translation Gateway (NATG)"
      },
      correct: "A"
    },
    {
      id: "CS-14",
      question: "What security assessment involves authorized simulated cyberattacks to discover and validate exploitable vulnerabilities in a system?",
      options: {
        A: "Static Code Formatting",
        B: "Penetration Testing (Ethical Hacking)",
        C: "Database Normalization",
        D: "Unit Regression Testing"
      },
      correct: "B"
    },
    {
      id: "CS-15",
      question: "Which secure network protocol encrypts web traffic using Transport Layer Security (TLS) over port 443?",
      options: {
        A: "Telnet",
        B: "FTP",
        C: "HTTPS",
        D: "SNMP"
      },
      correct: "C"
    },
    {
      id: "CS-16",
      question: "What security mechanism protects memory by ensuring that allocated memory regions are either writable or executable, but not both?",
      options: {
        A: "Address Resolution Protocol (ARP)",
        B: "Symmetric Encryption Wrapping",
        C: "Dynamic Buffer Compression",
        D: "Data Execution Prevention (W^X / DEP)"
      },
      correct: "D"
    },
    {
      id: "CS-17",
      question: "What is a honeypot in network defense strategy?",
      options: {
        A: "A decoy system intentionally deployed to detect, deflect, and study unauthorized attacker activity",
        B: "An automated password recovery portal for employees",
        C: "A high-speed caching server that accelerates database reads",
        D: "A physical lock mechanism on data center server cages"
      },
      correct: "A"
    },
    {
      id: "CS-18",
      question: "Which attack exploits trust by sending forged email claiming to be from a reputable source to lure individuals into revealing credentials?",
      options: {
        A: "Cross-Site Scripting",
        B: "Phishing",
        C: "SQL Injection",
        D: "SYN Flooding"
      },
      correct: "B"
    },
    {
      id: "CS-19",
      question: "In Public Key Infrastructure (PKI), what is the function of a Certificate Authority (CA)?",
      options: {
        A: "To manufacture motherboard hardware microchips securely",
        B: "To store plaintext employee passwords in a centralized directory",
        C: "To verify organizational identity and issue signed digital certificates validating public keys",
        D: "To route internet traffic across undersea optical fiber cables"
      },
      correct: "C"
    },
    {
      id: "CS-20",
      question: "What is a zero-day vulnerability in cybersecurity terminology?",
      options: {
        A: "A flaw that has been patched for more than 365 calendar days",
        B: "A password policy requiring daily password changes",
        C: "A backup system with zero seconds of data retention",
        D: "A software flaw unknown to the vendor, leaving zero days to prepare a patch prior to potential exploitation"
      },
      correct: "D"
    }
  ],

  "Artificial Intelligence & Machine Learning (AIML)": [
    {
      id: "AIML-01",
      question: "What is the primary optimization objective of the Gradient Descent algorithm in model training?",
      options: {
        A: "To iteratively adjust model parameters to minimize the loss or cost function",
        B: "To maximize the total number of hidden layers in a neural network",
        C: "To convert all text input tokens into one-hot binary matrices",
        D: "To eliminate all training samples that have negative numerical values"
      },
      correct: "A"
    },
    {
      id: "AIML-02",
      question: "In machine learning evaluation, what does the Recall metric quantify?",
      options: {
        A: "The proportion of predicted positives that were truly positive",
        B: "The proportion of actual positive instances correctly identified by the model",
        C: "The arithmetic average of model execution runtime per batch",
        D: "The ratio of training samples to testing samples in a dataset"
      },
      correct: "B"
    },
    {
      id: "AIML-03",
      question: "What neural network architecture incorporates convolutional filters and pooling layers, making it ideal for visual image processing?",
      options: {
        A: "Recurrent Neural Network (RNN)",
        B: "Multilayer Perceptron (MLP)",
        C: "Convolutional Neural Network (CNN)",
        D: "Radial Basis Function Network (RBFN)"
      },
      correct: "C"
    },
    {
      id: "AIML-04",
      question: "What phenomenon occurs when an artificial intelligence model performs exceptionally on training data but fails to generalize to test data?",
      options: {
        A: "Underfitting",
        B: "High Bias",
        C: "Gradient Saturation",
        D: "Overfitting"
      },
      correct: "D"
    },
    {
      id: "AIML-05",
      question: "Which activation function outputs values strictly in the range between 0 and 1, making it well-suited for binary probability estimation?",
      options: {
        A: "Sigmoid",
        B: "ReLU (Rectified Linear Unit)",
        C: "Leaky ReLU",
        D: "Linear Activation"
      },
      correct: "A"
    },
    {
      id: "AIML-06",
      question: "In reinforcement learning, what component balances exploration of new actions with exploitation of known high-reward actions?",
      options: {
        A: "Support Vector Margin",
        B: "Epsilon-Greedy Strategy",
        C: "K-Means Centroid Initializer",
        D: "Batch Normalization Layer"
      },
      correct: "B"
    },
    {
      id: "AIML-07",
      question: "What mathematical technique enables neural networks to calculate gradients of the loss with respect to all weights using the chain rule?",
      options: {
        A: "Heuristic Search",
        B: "Monte Carlo Sampling",
        C: "Backpropagation",
        D: "Singular Value Decomposition"
      },
      correct: "C"
    },
    {
      id: "AIML-08",
      question: "What type of learning uses an agent interacting with an environment through states, actions, and reward signals?",
      options: {
        A: "Supervised Learning",
        B: "Unsupervised Learning",
        C: "Self-Organizing Mapping",
        D: "Reinforcement Learning"
      },
      correct: "D"
    },
    {
      id: "AIML-09",
      question: "Which natural language processing technique maps vocabulary words to dense continuous vectors capturing semantic relationships?",
      options: {
        A: "Word Embeddings (such as Word2Vec)",
        B: "Stop Word Removal",
        C: "Lemmatization Prefixing",
        D: "One-Hot Matrix Stacking"
      },
      correct: "A"
    },
    {
      id: "AIML-10",
      question: "What is the primary function of a pooling layer (such as MaxPooling) in a Convolutional Neural Network?",
      options: {
        A: "To double the spatial dimensions of incoming feature maps",
        B: "To reduce spatial dimensions, parameter count, and computational burden while retaining dominant features",
        C: "To calculate classification probabilities across final output classes",
        D: "To normalize input pixels to follow an exponential distribution"
      },
      correct: "B"
    },
    {
      id: "AIML-11",
      question: "What metric is defined as the harmonic mean of precision and recall?",
      options: {
        A: "Mean Absolute Error",
        B: "R-Squared",
        C: "F1 Score",
        D: "Log-Loss"
      },
      correct: "C"
    },
    {
      id: "AIML-12",
      question: "What learning strategy reuses weights from a model trained on a massive generic dataset for a specialized target task with limited data?",
      options: {
        A: "Unsupervised Clustering",
        B: "Grid Hyperparameter Search",
        C: "Bootstrap Sampling",
        D: "Transfer Learning"
      },
      correct: "D"
    },
    {
      id: "AIML-13",
      question: "In Transformer neural network models, what mechanism enables the network to weigh the relative importance of different words in a sequence regardless of distance?",
      options: {
        A: "Self-Attention Mechanism",
        B: "Max Pooling Reduction",
        C: "Dropout Regularization",
        D: "Markov Chain Transition"
      },
      correct: "A"
    },
    {
      id: "AIML-14",
      question: "What is the role of dropout in deep neural network regularization?",
      options: {
        A: "Dropping rows that contain duplicate feature values before training",
        B: "Randomly deactivating a fraction of neurons during training passes to prevent co-adaptation",
        C: "Halving the numerical precision of model weights from float32 to float16",
        D: "Discarding testing samples that exceed one standard deviation"
      },
      correct: "B"
    },
    {
      id: "AIML-15",
      question: "Which machine learning algorithm finds a hyperplane that maximizes the margin separating distinct classes of data points?",
      options: {
        A: "K-Means Clustering",
        B: "Decision Tree Regressor",
        C: "Support Vector Machine (SVM)",
        D: "Gaussian Mixture Model"
      },
      correct: "C"
    },
    {
      id: "AIML-16",
      question: "What recurrent architecture was specifically developed to resolve the vanishing gradient problem when learning long-term dependencies in sequential data?",
      options: {
        A: "Standard Vanilla Perceptron",
        B: "Feedforward Neural Network",
        C: "Restricted Boltzmann Machine",
        D: "Long Short-Term Memory (LSTM) Network"
      },
      correct: "D"
    },
    {
      id: "AIML-17",
      question: "What unsupervised algorithm clusters data by iteratively updating cluster centroids to minimize the within-cluster sum of squares?",
      options: {
        A: "K-Means Clustering",
        B: "Linear Regression",
        C: "Random Forest Classifier",
        D: "Logistic Regression"
      },
      correct: "A"
    },
    {
      id: "AIML-18",
      question: "In generative modeling, what two sub-networks compete against each other in a Generative Adversarial Network (GAN)?",
      options: {
        A: "An encoder and a decoder",
        B: "A generator and a discriminator",
        C: "A classifier and a regressor",
        D: "A policy network and a value network"
      },
      correct: "B"
    },
    {
      id: "AIML-19",
      question: "What is the Dying ReLU problem observed in neural network training?",
      options: {
        A: "Memory corruption caused by floating point division by zero",
        B: "Network weights becoming infinitely large during forward propagation",
        C: "Neurons becoming permanently inactive when inputs remain negative, yielding zero gradient",
        D: "The GPU cooling system failing during intensive batch training"
      },
      correct: "C"
    },
    {
      id: "AIML-20",
      question: "Which loss function is standard for evaluating multi-class classification neural networks with softmax output layers?",
      options: {
        A: "Mean Squared Error",
        B: "Hinge Loss",
        C: "Mean Absolute Percentage Error",
        D: "Categorical Cross-Entropy Loss"
      },
      correct: "D"
    }
  ],

  "Python with Machine Learning": [
    {
      id: "PYML-01",
      question: "In scikit-learn, what object encapsulates a sequence of data transformations followed by a final estimator into a unified object?",
      options: {
        A: "Pipeline",
        B: "GridSearchCV",
        C: "FeatureUnion",
        D: "ColumnTransformer"
      },
      correct: "A"
    },
    {
      id: "PYML-02",
      question: "Which scikit-learn model selection class exhaustively searches across specified parameter values using cross-validation?",
      options: {
        A: "CrossValidator",
        B: "GridSearchCV",
        C: "RandomSplitter",
        D: "ModelTuner"
      },
      correct: "B"
    },
    {
      id: "PYML-03",
      question: "In Python, which library function from joblib or pickle is commonly used to serialize and save a trained machine learning model to disk?",
      options: {
        A: "joblib.read()",
        B: "joblib.export_code()",
        C: "joblib.dump()",
        D: "joblib.commit()"
      },
      correct: "C"
    },
    {
      id: "PYML-04",
      question: "Which scikit-learn metric function produces a summary table showing precision, recall, and F1-score for each class?",
      options: {
        A: "accuracy_score",
        B: "roc_auc_score",
        C: "confusion_matrix",
        D: "classification_report"
      },
      correct: "D"
    },
    {
      id: "PYML-05",
      question: "In scikit-learn, which estimator is used for binary or multiclass classification via logistic sigmoid regression?",
      options: {
        A: "LogisticRegression",
        B: "LinearRegression",
        C: "RidgeClassifier",
        D: "ElasticNet"
      },
      correct: "A"
    },
    {
      id: "PYML-06",
      question: "In Python, what is the role of the 'random_state' parameter across scikit-learn estimators and splitting functions?",
      options: {
        A: "To seed the operating system process scheduler",
        B: "To ensure reproducible outputs across repeated runs by seeding the pseudo-random generator",
        C: "To randomize the order of features during prediction",
        D: "To automatically split training batches into equal thread counts"
      },
      correct: "B"
    },
    {
      id: "PYML-07",
      question: "Which transformer in scikit-learn applies one-hot encoding specifically to designated categorical columns while leaving numerical columns untouched?",
      options: {
        A: "StandardScaler",
        B: "LabelEncoder",
        C: "ColumnTransformer",
        D: "SimpleImputer"
      },
      correct: "C"
    },
    {
      id: "PYML-08",
      question: "What popular gradient boosting Python library builds decision trees sequentially to minimize pseudo-residuals using second-order gradients?",
      options: {
        A: "Statsmodels",
        B: "Theano",
        C: "OpenCV",
        D: "XGBoost"
      },
      correct: "D"
    },
    {
      id: "PYML-09",
      question: "In scikit-learn, which class imputes missing values in tabular datasets using strategies like mean, median, or most frequent?",
      options: {
        A: "SimpleImputer",
        B: "DataCleaner",
        C: "NullFiller",
        D: "MissingValueTransformer"
      },
      correct: "A"
    },
    {
      id: "PYML-10",
      question: "What scikit-learn metric matrix tabulates true positives, false positives, true negatives, and false negatives?",
      options: {
        A: "Correlation Matrix",
        B: "Confusion Matrix",
        C: "Inertia Matrix",
        D: "Covariance Matrix"
      },
      correct: "B"
    },
    {
      id: "PYML-11",
      question: "In Python machine learning workflows, why is it critical to fit scalers ONLY on training data before transforming test data?",
      options: {
        A: "Scalers crash if they encounter more than 1000 samples",
        B: "Test data cannot contain floating point values",
        C: "To prevent data leakage of test set distribution statistics into the training process",
        D: "Because scikit-learn strictly forbids evaluating unscaled targets"
      },
      correct: "C"
    },
    {
      id: "PYML-12",
      question: "Which scikit-learn class implements Random Forest classification by constructing a multitude of decision trees?",
      options: {
        A: "DecisionTreeClassifier",
        B: "ExtraTreeRegressor",
        C: "VotingClassifier",
        D: "RandomForestClassifier"
      },
      correct: "D"
    },
    {
      id: "PYML-13",
      question: "What is the primary difference between fit() and fit_transform() on a scikit-learn transformer?",
      options: {
        A: "fit() computes internal parameters; fit_transform() computes parameters and returns transformed data",
        B: "fit() runs on GPU while fit_transform() runs on CPU",
        C: "fit_transform() is used exclusively on test data",
        D: "fit() permanently deletes rows with missing values"
      },
      correct: "A"
    },
    {
      id: "PYML-14",
      question: "In imbalanced-learn, what technique generates synthetic samples for minority classes along line segments joining nearest neighbors?",
      options: {
        A: "Random Majority Downsampling",
        B: "SMOTE (Synthetic Minority Over-sampling Technique)",
        C: "Adaboost Feature Selection",
        D: "One-Class SVM Filtering"
      },
      correct: "B"
    },
    {
      id: "PYML-15",
      question: "Which scikit-learn algorithm implements Support Vector Classification with linear and non-linear kernels?",
      options: {
        A: "LinearRegression",
        B: "KMeans",
        C: "SVC",
        D: "SGDRegressor"
      },
      correct: "C"
    },
    {
      id: "PYML-16",
      question: "In Python, which scikit-learn function calculates the area under the Receiver Operating Characteristic curve from prediction scores?",
      options: {
        A: "f1_score",
        B: "precision_score",
        C: "log_loss",
        D: "roc_auc_score"
      },
      correct: "D"
    },
    {
      id: "PYML-17",
      question: "What does the 'n_jobs=-1' parameter indicate in scikit-learn models that support parallelism?",
      options: {
        A: "Utilize all available CPU cores for concurrent processing",
        B: "Disable all multi-threading and run sequentially",
        C: "Run the task on remote cloud instances automatically",
        D: "Suppress all terminal warning messages"
      },
      correct: "A"
    },
    {
      id: "PYML-18",
      question: "In scikit-learn clustering, what attribute on a fitted KMeans model contains the coordinates of cluster centers?",
      options: {
        A: "model.labels_",
        B: "model.cluster_centers_",
        C: "model.inertia_",
        D: "model.n_iter_"
      },
      correct: "B"
    },
    {
      id: "PYML-19",
      question: "Which linear model applies both L1 and L2 regularization penalties simultaneously?",
      options: {
        A: "Lasso Regression",
        B: "Ridge Regression",
        C: "ElasticNet",
        D: "Ordinary Least Squares"
      },
      correct: "C"
    },
    {
      id: "PYML-20",
      question: "What is early stopping in gradient boosting and neural network training?",
      options: {
        A: "Terminating the server when available disk space falls below 10%",
        B: "Halting model training when the user presses Ctrl+C in terminal",
        C: "Stopping the training process when memory usage reaches 100%",
        D: "Halting model training when validation performance ceases to improve across consecutive epochs"
      },
      correct: "D"
    }
  ]
}

if (process.argv[1] && process.argv[1].endsWith('build-batch-2.mjs')) {
  applyBatch(batch2Questions)
}
