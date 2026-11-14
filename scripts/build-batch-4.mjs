import { applyBatch } from './build-batch-1.mjs'

export const batch4Questions = {
  "Internet of Things (IOT)": [
    {
      id: "IOT-01",
      question: "Which lightweight publish-subscribe messaging protocol is widely used in IoT for constrained low-bandwidth networks?",
      options: {
        A: "MQTT",
        B: "SNMP",
        C: "SMTP",
        D: "FTP"
      },
      correct: "A"
    },
    {
      id: "IOT-02",
      question: "What does Quality of Service level 1 (QoS 1) guarantee in MQTT communication?",
      options: {
        A: "Messages are delivered at most once with no confirmation",
        B: "Messages are delivered at least once with a PUBACK confirmation",
        C: "Messages are delivered exactly once via a four-step handshake",
        D: "Messages are broadcast to all connected devices simultaneously"
      },
      correct: "B"
    },
    {
      id: "IOT-03",
      question: "Which wireless protocol is best suited for long-range, low-power telemetry transmission over several kilometers?",
      options: {
        A: "Near Field Communication (NFC)",
        B: "High-speed Wi-Fi 6E",
        C: "LoRaWAN",
        D: "Classic Bluetooth 2.1"
      },
      correct: "C"
    },
    {
      id: "IOT-04",
      question: "What is the primary role of an IoT Gateway in a connected smart infrastructure?",
      options: {
        A: "Storing permanent relational databases for enterprise ERP systems",
        B: "Translating heterogeneous sensor protocols, aggregating data, and bridging local devices to the cloud",
        C: "Replacing all analog sensors with digital displays",
        D: "Providing alternating current wall power directly to battery sensors"
      },
      correct: "B"
    },
    {
      id: "IOT-05",
      question: "Which sensor is specifically designed to detect human motion by measuring changes in infrared radiation?",
      options: {
        A: "Passive Infrared (PIR) sensor",
        B: "Thermocouple probe",
        C: "Photoresistor (LDR)",
        D: "Hall effect sensor"
      },
      correct: "A"
    },
    {
      id: "IOT-06",
      question: "In Constrained Application Protocol (CoAP), which transport layer protocol is utilized instead of TCP?",
      options: {
        A: "ICMP",
        B: "UDP",
        C: "SCTP",
        D: "IGMP"
      },
      correct: "B"
    },
    {
      id: "IOT-07",
      question: "What is the primary motivation for implementing Edge Computing in IoT deployments?",
      options: {
        A: "Increasing data egress fees paid to cloud providers",
        B: "Disabling all local sensor calibration routines",
        C: "Processing data near the source to reduce latency, save bandwidth, and enable real-time local decisions",
        D: "Replacing microcontroller firmware with interpreted browser JavaScript"
      },
      correct: "C"
    },
    {
      id: "IOT-08",
      question: "In MQTT, what is a Last Will and Testament (LWT) message used for?",
      options: {
        A: "Upgrading client firmware over the air automatically",
        B: "Encrypting sensor readings with public key cryptography",
        C: "Renewing device battery warranty contracts online",
        D: "Notifying other subscribers when a client disconnects unexpectedly without sending a DISCONNECT packet"
      },
      correct: "D"
    },
    {
      id: "IOT-09",
      question: "What does an Analog-to-Digital Converter (ADC) do in an IoT microcontroller circuit?",
      options: {
        A: "Converts continuous physical analog voltage signals into discrete digital numerical values",
        B: "Converts 230V AC mains supply into 3.3V DC power",
        C: "Converts Wi-Fi radio frequencies into audible acoustic tones",
        D: "Translates high-level C code into assembly machine code"
      },
      correct: "A"
    },
    {
      id: "IOT-10",
      question: "Which microcontroller module features integrated Wi-Fi and Bluetooth connectivity and dual-core processing, making it ubiquitous in IoT prototyping?",
      options: {
        A: "PIC16F877A",
        B: "ESP32",
        C: "ATmega328P standalone",
        D: "Intel 8051"
      },
      correct: "B"
    },
    {
      id: "IOT-11",
      question: "What is the key advantage of Bluetooth Low Energy (BLE) over standard Classic Bluetooth?",
      options: {
        A: "Higher audio streaming bitrate for studio microphones",
        B: "Greater transmission distance reaching over twenty kilometers",
        C: "Significantly reduced power consumption, allowing sensors to operate for years on coin-cell batteries",
        D: "Support for direct satellite uplink without cellular towers"
      },
      correct: "C"
    },
    {
      id: "IOT-12",
      question: "In an IoT device fleet, what does Over-The-Air (OTA) programming enable engineers to do?",
      options: {
        A: "Transmit high-voltage electrical power wirelessly across the factory floor",
        B: "Charge device lithium-ion batteries using ambient radio waves",
        C: "Physically solder circuit components using aerial laser drones",
        D: "Update microcontroller firmware wirelessly across remote field devices without physical cable connections"
      },
      correct: "D"
    },
    {
      id: "IOT-13",
      question: "Which communication topology connects every sensor node through intermediate peer nodes to extend network range and resilience?",
      options: {
        A: "Mesh topology",
        B: "Star topology",
        C: "Bus topology",
        D: "Ring topology"
      },
      correct: "A"
    },
    {
      id: "IOT-14",
      question: "What does the MQTT broker do in an IoT publish-subscribe architecture?",
      options: {
        A: "Executes machine learning training jobs on raw video streams",
        B: "Receives all incoming messages, filters them by topic, and distributes them to subscribed clients",
        C: "Physically switches high-voltage electrical relays on local circuit boards",
        D: "Manufactures microchip wafers in cleanroom facilities"
      },
      correct: "B"
    },
    {
      id: "IOT-15",
      question: "Which security protocol provides transport-layer encryption and authentication for secure MQTT communication (MQTTS)?",
      options: {
        A: "Telnet",
        B: "FTP",
        C: "TLS/SSL",
        D: "SNMPv1"
      },
      correct: "C"
    },
    {
      id: "IOT-16",
      question: "What is an actuator in an IoT system?",
      options: {
        A: "A passive resistor that converts electrical energy into heat",
        B: "A software debugger used to set breakpoints in C firmware",
        C: "A database index that speeds up time-series telemetry lookups",
        D: "A hardware device that converts an electrical control signal into physical mechanical motion or action"
      },
      correct: "D"
    },
    {
      id: "IOT-17",
      question: "Which low-power wireless standard based on IEEE 802.15.4 is commonly used for smart home automation mesh networks?",
      options: {
        A: "Zigbee",
        B: "Wi-Fi Direct",
        C: "NFC Type A",
        D: "Ethernet 100BASE-TX"
      },
      correct: "A"
    },
    {
      id: "IOT-18",
      question: "What does the duty cycling technique accomplish in battery-powered IoT edge sensors?",
      options: {
        A: "Permanently overclocking the processor clock frequency",
        B: "Alternating between active and deep sleep states to minimize average power consumption",
        C: "Reversing electrical polarity across solar charging cells",
        D: "Formatting flash memory on every reboot cycle"
      },
      correct: "B"
    },
    {
      id: "IOT-19",
      question: "What is a Digital Twin in IoT and industrial manufacturing?",
      options: {
        A: "A backup physical duplicate circuit board kept in warehouse storage",
        B: "A mirrored hard disk drive in a RAID array",
        C: "A dynamic virtual digital representation of a physical asset, system, or process updated via live telemetry",
        D: "A two-factor authentication key fob used by plant technicians"
      },
      correct: "C"
    },
    {
      id: "IOT-20",
      question: "What is the primary security vulnerability of using hardcoded default credentials in IoT consumer devices?",
      options: {
        A: "It increases cellular data transmission latency",
        B: "It prevents devices from waking up from deep sleep mode",
        C: "It causes memory fragmentation in dynamic RAM heaps",
        D: "It allows attackers to scan and remotely compromise thousands of devices to assemble botnets like Mirai"
      },
      correct: "D"
    }
  ],
  "Embedded System": [
    {
      id: "ES-01",
      question: "What is the fundamental architectural difference between a microcontroller and a microprocessor?",
      options: {
        A: "A microcontroller integrates CPU, RAM, ROM, and peripherals onto a single chip, whereas a microprocessor requires external memory and peripherals",
        B: "A microcontroller cannot execute compiled C code",
        C: "A microprocessor only operates with analog signals",
        D: "A microcontroller has infinite instruction cache memory"
      },
      correct: "A"
    },
    {
      id: "ES-02",
      question: "In embedded hardware, what is the primary role of a Watchdog Timer (WDT)?",
      options: {
        A: "Measuring ambient operating room temperature",
        B: "Resetting the microcontroller automatically if the software enters an infinite loop or hangs",
        C: "Modulating audio frequencies for piezo buzzers",
        D: "Displaying real-time wall-clock time on liquid crystal displays"
      },
      correct: "B"
    },
    {
      id: "ES-03",
      question: "Which serial communication bus uses two bidirectional lines called SDA (Serial Data) and SCL (Serial Clock)?",
      options: {
        A: "UART",
        B: "SPI",
        C: "I2C",
        D: "CAN"
      },
      correct: "C"
    },
    {
      id: "ES-04",
      question: "What is an Interrupt Service Routine (ISR) in embedded programming?",
      options: {
        A: "A background operating system garbage collection daemon",
        B: "A compiler optimization phase that removes unused variables",
        C: "A hardware peripheral that regulates battery charging voltage",
        D: "A specialized callback function executed immediately in response to a hardware or software interrupt event"
      },
      correct: "D"
    },
    {
      id: "ES-05",
      question: "In C programming for embedded systems, why is the volatile keyword applied to a variable?",
      options: {
        A: "To inform the compiler that the variable value can change unexpectedly outside the current code flow (such as by hardware or ISR)",
        B: "To allocate the variable in permanent flash memory instead of SRAM",
        C: "To prevent other source files from importing the variable",
        D: "To automatically encrypt the variable value against memory dump attacks"
      },
      correct: "A"
    },
    {
      id: "ES-06",
      question: "Which serial protocol is synchronous, full-duplex, and uses four lines: MOSI, MISO, SCK, and SS/CS?",
      options: {
        A: "RS-232",
        B: "SPI",
        C: "I2C",
        D: "1-Wire"
      },
      correct: "B"
    },
    {
      id: "ES-07",
      question: "In Real-Time Operating Systems (RTOS), what defines a hard real-time system?",
      options: {
        A: "Missing a task deadline results in catastrophic system failure or safety violation",
        B: "Tasks are guaranteed to finish before the end of the calendar day",
        C: "Execution speed can be throttled dynamically to conserve battery life",
        D: "Tasks are prioritized based on alphabetical order of function names"
      },
      correct: "A"
    },
    {
      id: "ES-08",
      question: "What is Pulse Width Modulation (PWM) primarily used for in microcontroller applications?",
      options: {
        A: "Formatting data packets for Wi-Fi routers",
        B: "Controlling motor speed, LED brightness, or power delivery by varying the signal duty cycle",
        C: "Increasing the bit resolution of flash memory cells",
        D: "Synchronizing RTC clocks with GPS atomic standards"
      },
      correct: "B"
    },
    {
      id: "ES-09",
      question: "What is the primary function of a Bootloader in an embedded system?",
      options: {
        A: "Formatting SD cards before first read operations",
        B: "Generating audio tones during system startup",
        C: "Initializing hardware registers and loading the main application firmware into memory upon system boot or reset",
        D: "Translating high-level Python code into assembly instructions at runtime"
      },
      correct: "C"
    },
    {
      id: "ES-10",
      question: "In memory management, what is the fundamental difference between SRAM and DRAM?",
      options: {
        A: "SRAM requires periodic refresh cycles while DRAM retains data indefinitely without power",
        B: "SRAM stores data using capacitors while DRAM uses flip-flops",
        C: "SRAM is slower and denser than DRAM",
        D: "SRAM is faster and does not require periodic refreshing, whereas DRAM is denser and requires continuous refresh cycles"
      },
      correct: "D"
    },
    {
      id: "ES-11",
      question: "What is a General Purpose Input/Output (GPIO) pin?",
      options: {
        A: "A pin whose electrical behavior (input or output, high or low) can be configured dynamically through software registers",
        B: "A dedicated pin used strictly for supplying 220V mains electricity",
        C: "A physical terminal used exclusively to connect external crystal oscillators",
        D: "An internal CPU register holding the program counter address"
      },
      correct: "A"
    },
    {
      id: "ES-12",
      question: "What is the primary role of a pull-up resistor connected to a digital microcontroller input pin?",
      options: {
        A: "To amplify input voltage beyond the maximum CPU supply rating",
        B: "To ensure the input pin settles at a known high logic state when the circuit is open or floating",
        C: "To prevent electromagnetic interference from clock oscillators",
        D: "To step down alternating current to direct current"
      },
      correct: "B"
    },
    {
      id: "ES-13",
      question: "In an RTOS, what does Priority Inversion describe?",
      options: {
        A: "An arithmetic overflow occurring inside high-priority floating-point math libraries",
        B: "A compiler flag that reverses the order of array indexing in memory",
        C: "A scenario where a high-priority task is blocked waiting for a shared resource held by a low-priority task",
        D: "A power-saving state where CPU cores run in reverse clock order"
      },
      correct: "C"
    },
    {
      id: "ES-14",
      question: "Which communication standard is widely used in automotive embedded networks for robust, collision-free message arbitration?",
      options: {
        A: "Ethernet 10BASE-T",
        B: "USB 3.0",
        C: "Zigbee Pro",
        D: "Controller Area Network (CAN)"
      },
      correct: "D"
    },
    {
      id: "ES-15",
      question: "What is Direct Memory Access (DMA) in microcontroller architectures?",
      options: {
        A: "A feature that allows hardware peripherals to transfer data directly to and from memory without involving the CPU",
        B: "A software debugger technique for reading CPU registers over JTAG",
        C: "A memory protection mechanism that disables RAM writes during interrupts",
        D: "An optical interface connecting flash memory to display drivers"
      },
      correct: "A"
    },
    {
      id: "ES-16",
      question: "Why should an Interrupt Service Routine (ISR) be kept as short and fast as possible?",
      options: {
        A: "Because lengthy ISRs waste flash storage space permanently",
        B: "To prevent delaying or blocking other time-critical interrupts and maintain system responsiveness",
        C: "Because microcontrollers automatically erase SRAM if an ISR runs for more than ten instructions",
        D: "To allow the CPU clock to cool down during interrupt handling"
      },
      correct: "B"
    },
    {
      id: "ES-17",
      question: "Which hardware interface is universally used for on-chip debugging, flash programming, and boundary scan testing in microcontrollers?",
      options: {
        A: "VGA connector",
        B: "Parallel ATA bus",
        C: "JTAG or SWD",
        D: "PS/2 keyboard port"
      },
      correct: "C"
    },
    {
      id: "ES-18",
      question: "In digital circuit design, what does switch debouncing prevent?",
      options: {
        A: "Overheating of external pull-down resistors",
        B: "Capacitive discharge into analog ground planes",
        C: "Microcontroller clock frequency drifting",
        D: "False multiple trigger events caused by the mechanical contact bounce of a physical switch"
      },
      correct: "D"
    },
    {
      id: "ES-19",
      question: "What distinguishes the Harvard architecture from the von Neumann architecture?",
      options: {
        A: "Harvard uses physically separate storage and signal pathways for instructions and data, whereas von Neumann shares memory and bus for both",
        B: "Harvard requires 64-bit instruction words while von Neumann requires 8-bit registers",
        C: "Harvard systems cannot execute recursive functions",
        D: "Harvard architecture is used exclusively in quantum supercomputers"
      },
      correct: "A"
    },
    {
      id: "ES-20",
      question: "What is a major advantage of using FreeRTOS in an embedded commercial application?",
      options: {
        A: "It eliminates the need for microcontroller hardware testing",
        B: "It provides deterministic preemptive scheduling, lightweight memory footprint, and modular task management",
        C: "It automatically writes device driver C code for any connected sensor",
        D: "It allows 8-bit microcontrollers to run web browser user interfaces"
      },
      correct: "B"
    }
  ],
  "VLSI": [
    {
      id: "VLSI-01",
      question: "What is the primary advantage of CMOS (Complementary Metal-Oxide-Semiconductor) technology over NMOS-only logic?",
      options: {
        A: "Near-zero static power dissipation because NMOS and PMOS networks are never on simultaneously in steady state",
        B: "Higher manufacturing cost per square millimeter of silicon wafer",
        C: "Complete immunity to thermal noise at room temperature",
        D: "Ability to operate without gate oxide dielectric layers"
      },
      correct: "A"
    },
    {
      id: "VLSI-02",
      question: "In digital sequential circuits, what is setup time (t_setup)?",
      options: {
        A: "The time required to manufacture a photolithography mask",
        B: "The minimum duration that input data must remain stable before the active clock edge arrives",
        C: "The time elapsed between clock trigger and output Q valid transition",
        D: "The duration needed to power up the internal phase-locked loop (PLL)"
      },
      correct: "B"
    },
    {
      id: "VLSI-03",
      question: "In digital sequential circuits, what is hold time (t_hold)?",
      options: {
        A: "The duration the chip can be held in warehouse inventory before assembly",
        B: "The time needed to discharge decoupling capacitors after power-down",
        C: "The minimum duration that input data must remain stable after the active clock edge has arrived",
        D: "The delay between synthesized gate nets and pad ring buffers"
      },
      correct: "C"
    },
    {
      id: "VLSI-04",
      question: "What occurs when a flip-flop experiences a setup or hold time timing violation?",
      options: {
        A: "The clock tree synthesizer permanently halts future compiles",
        B: "The silicon substrate develops physical electromigration cracks",
        C: "The supply rail voltage increases by twenty percent automatically",
        D: "The flip-flop output enters a metastable state, hovering between logic 0 and 1 before settling unpredictably"
      },
      correct: "D"
    },
    {
      id: "VLSI-05",
      question: "In hardware description languages like Verilog, what is the fundamental difference between blocking (=) and non-blocking (<=) assignments?",
      options: {
        A: "Blocking assignments execute sequentially and immediately update variables, while non-blocking assignments evaluate concurrently and update at the end of the time step",
        B: "Blocking assignments are used strictly for testbench delays while non-blocking assignments are for FPGA pins",
        C: "Blocking assignments synthesize exclusively to flip-flops while non-blocking synthesize to wires",
        D: "Blocking assignments are restricted to analog SPICE simulations"
      },
      correct: "A"
    },
    {
      id: "VLSI-06",
      question: "What is Static Timing Analysis (STA) in the VLSI digital design flow?",
      options: {
        A: "Simulating all input vector combinations across billions of clock cycles",
        B: "A simulation-free method of verifying whether all signal paths satisfy setup and hold constraints under worst-case process corners",
        C: "Measuring steady-state leakage current using an external multimeter",
        D: "Counting the number of physical bond wires connecting the die to the leadframe"
      },
      correct: "B"
    },
    {
      id: "VLSI-07",
      question: "In CMOS fabrication, what is the purpose of Design Rule Checking (DRC)?",
      options: {
        A: "Verifying that the synthesized netlist matches functional behavioral RTL",
        B: "Checking whether employee timesheets comply with corporate labor regulations",
        C: "Verifying that geometric layout features satisfy foundry geometric manufacturing limits (spacing, width, enclosure)",
        D: "Calculating the total number of flip-flops in a scan chain"
      },
      correct: "C"
    },
    {
      id: "VLSI-08",
      question: "What does Layout Versus Schematic (LVS) check verify during physical design signoff?",
      options: {
        A: "That the physical mask layout connectivity matches the logical electrical circuit schematic perfectly",
        B: "That the silicon wafer thickness complies with international shipping guidelines",
        C: "That all register file addresses are mapped to non-volatile ROM",
        D: "That the Verilog code adheres to naming conventions for clock signals"
      },
      correct: "A"
    },
    {
      id: "VLSI-09",
      question: "In a CMOS inverter, why is the PMOS transistor typically designed with a wider channel (W/L ratio) than the NMOS transistor?",
      options: {
        A: "To reduce parasitic capacitance across gate terminals",
        B: "Because hole mobility in silicon is significantly lower than electron mobility, requiring wider PMOS for equal drive strength",
        C: "To prevent thermal latch-up between adjacent N-wells",
        D: "To ensure the PMOS transistor acts as an inductive choke filter"
      },
      correct: "B"
    },
    {
      id: "VLSI-10",
      question: "What is Clock Skew in a synchronous digital integrated circuit?",
      options: {
        A: "The total number of clock cycles consumed by division arithmetic units",
        B: "The frequency modulation introduced by external spread-spectrum oscillators",
        C: "The difference in clock arrival times at different flip-flops across the chip due to wire delays and buffer variations",
        D: "The phase drift between primary and secondary supply voltage rails"
      },
      correct: "C"
    },
    {
      id: "VLSI-11",
      question: "What does Clock Jitter refer to in high-speed digital systems?",
      options: {
        A: "The mechanical vibration of the semiconductor package during ultrasonic bonding",
        B: "The reduction in clock amplitude caused by resistive copper wire losses",
        C: "The routing congestion observed in multi-layer metal grids",
        D: "The variation in clock edge arrival time at a single point relative to an ideal periodic clock over successive cycles"
      },
      correct: "D"
    },
    {
      id: "VLSI-12",
      question: "What is the primary role of Clock Tree Synthesis (CTS) during ASIC place and route?",
      options: {
        A: "Designing combinatorial multiplexers for arithmetic logic units",
        B: "Balancing clock distribution networks with buffers to minimize clock skew and latency across all sequential elements",
        C: "Synthesizing testbenches for functional verification coverage",
        D: "Converting VHDL packages into SystemVerilog interfaces"
      },
      correct: "B"
    },
    {
      id: "VLSI-13",
      question: "What is a major advantage of an FPGA (Field-Programmable Gate Array) over a custom ASIC?",
      options: {
        A: "Lower unit manufacturing cost when producing hundreds of millions of units",
        B: "Higher maximum clock frequencies and zero static power leakage",
        C: "Reconfigurability in the field and zero non-recurring engineering (NRE) mask tooling costs",
        D: "Smaller physical silicon area per logic gate implementation"
      },
      correct: "C"
    },
    {
      id: "VLSI-14",
      question: "What is the primary danger of parasitic SCR latch-up in bulk CMOS integrated circuits?",
      options: {
        A: "Premature erasure of non-volatile configuration memory cells",
        B: "Loss of antenna rule compliance during polysilicon etching",
        C: "Excessive clock jitter in digital delay-locked loops",
        D: "Sudden low-impedance short-circuit path between VDD and GND that can draw massive current and permanently destroy the chip"
      },
      correct: "D"
    },
    {
      id: "VLSI-15",
      question: "What is Scan Chain insertion in Design for Testability (DFT)?",
      options: {
        A: "Using optical microscopes to scan finished silicon wafers for dust particles",
        B: "Routing power rails in parallel stripes across the top metal layers",
        C: "Scanning source code for syntax errors before synthesis compilation",
        D: "Connecting functional flip-flops into a long shift register during test mode to make internal state observable and controllable"
      },
      correct: "D"
    },
    {
      id: "VLSI-16",
      question: "What does Moore Law empirically state regarding semiconductor progress?",
      options: {
        A: "Clock frequencies of microprocessors double every five years while voltages increase linearly",
        B: "The number of transistors on a microchip doubles approximately every two years with decreasing cost per transistor",
        C: "Software execution speed doubles every six months independently of hardware architecture",
        D: "Silicon wafer diameter doubles every decade without increasing manufacturing complexity"
      },
      correct: "B"
    },
    {
      id: "VLSI-17",
      question: "In deep submicron CMOS technologies, which factor contributes most significantly to total power dissipation when the circuit is idle?",
      options: {
        A: "Combinatorial dynamic switching charging capacitance",
        B: "Short-circuit crowbar current during output transitions",
        C: "Subthreshold leakage and gate oxide tunneling currents",
        D: "Inductive ground bounce across bond wire leads"
      },
      correct: "C"
    },
    {
      id: "VLSI-18",
      question: "What is the primary technique used to safely transfer multi-bit asynchronous signals across different Clock Domains (CDC)?",
      options: {
        A: "Connecting the clock nets together with an inverter buffer",
        B: "Using asynchronous FIFOs or Gray-coded pointer synchronization to prevent metastability and data corruption",
        C: "Running both clock trees at the exact same physical wire length without buffers",
        D: "Increasing the power supply voltage on the destination domain"
      },
      correct: "B"
    },
    {
      id: "VLSI-19",
      question: "In physical design layout, what does the Antenna Effect (plasma-induced gate oxide damage) refer to?",
      options: {
        A: "Unintended broadcast of RF frequencies that violates FCC communication standards",
        B: "Attenuation of clock signals when passing near copper heatsinks",
        C: "Absorption of wireless cellular signals by ungrounded metal fill patterns",
        D: "Accumulation of static charge on long metal interconnects during manufacturing that discharges through and damages delicate gate oxides"
      },
      correct: "D"
    },
    {
      id: "VLSI-20",
      question: "What does the term Standard Cell Library encompass in an ASIC synthesis flow?",
      options: {
        A: "A database of retail pricing tables for consumer electronic components",
        B: "A legal repository of patented HDL source code snippets for open-source projects",
        C: "A pre-designed, pre-characterized collection of low-level digital logic gates with timing, power, and layout views",
        D: "A cleanroom protocol specification for chemical vapor deposition equipment"
      },
      correct: "C"
    }
  ],
  "Hybrid Electric Vehicles": [
    {
      id: "HEV-01",
      question: "In a Series Hybrid Electric Vehicle powertrain architecture, how is the internal combustion engine (ICE) utilized?",
      options: {
        A: "The ICE has no mechanical connection to the wheels and operates solely to drive an electric generator that charges the battery or powers the traction motor",
        B: "The ICE drives the wheels directly through a conventional multi-gear mechanical transmission",
        C: "The ICE only operates when the vehicle is in reverse gear",
        D: "The ICE is powered by hydrogen fuel cells rather than fossil fuels"
      },
      correct: "A"
    },
    {
      id: "HEV-02",
      question: "What is regenerative braking in hybrid and electric vehicle powertrains?",
      options: {
        A: "Applying hydraulic brake pads with high pressure to generate friction heat",
        B: "Using the electric traction motor as a generator during deceleration to recover kinetic energy and charge the high-voltage battery",
        C: "Reversing the combustion engine rotation to slow down the vehicle wheels",
        D: "Deploying aerodynamic flaps from the vehicle roof during emergency stops"
      },
      correct: "B"
    },
    {
      id: "HEV-03",
      question: "What does State of Charge (SoC) represent in an electric vehicle battery management system?",
      options: {
        A: "The percentage of available battery capacity remaining relative to its total rated capacity",
        B: "The physical temperature in degrees Celsius of the center battery cell",
        C: "The total number of charging cycles the battery pack has completed over its lifetime",
        D: "The electrical resistance of the high-voltage isolation safety switch"
      },
      correct: "A"
    },
    {
      id: "HEV-04",
      question: "What does State of Health (SoH) measure in automotive traction battery diagnostics?",
      options: {
        A: "The current battery condition and maximum retainable capacity compared to its original nominal capacity when brand new",
        B: "The instantaneous voltage drop under heavy acceleration",
        C: "The cabin air quality index measured near passenger seats",
        D: "The coolant fluid pressure inside the inverter radiator loop"
      },
      correct: "A"
    },
    {
      id: "HEV-05",
      question: "What is the critical role of a Battery Management System (BMS) in a hybrid or electric vehicle?",
      options: {
        A: "Controlling the touch screen multimedia dashboard display",
        B: "Regulating automatic windshield wiper speeds during rainstorms",
        C: "Monitoring cell voltages, balancing cells, tracking temperature, and protecting against overcharging and thermal runaway",
        D: "Negotiating toll booth wireless transponder payments"
      },
      correct: "C"
    },
    {
      id: "HEV-06",
      question: "Why is cell balancing essential across multi-cell lithium-ion battery packs?",
      options: {
        A: "To physically distribute the mechanical weight evenly over vehicle axles",
        B: "To allow the battery pack to operate without an emergency disconnect fuse",
        C: "To ensure all cells maintain equal charge levels, preventing weak cells from over-discharging and strong cells from over-charging",
        D: "To convert all DC electrical current into single-phase alternating current"
      },
      correct: "C"
    },
    {
      id: "HEV-07",
      question: "Which type of electric motor is most widely adopted for modern EV traction due to its high power density, efficiency, and compact size?",
      options: {
        A: "Single-phase shaded-pole AC induction motor",
        B: "Brushed DC series-wound motor",
        C: "Permanent Magnet Synchronous Motor (PMSM)",
        D: "Variable reluctance stepping motor"
      },
      correct: "C"
    },
    {
      id: "HEV-08",
      question: "In an electric vehicle powertrain, what is the primary function of the traction Inverter?",
      options: {
        A: "To step down 400V DC to 12V DC for auxiliary headlights and radios",
        B: "To convert high-voltage DC electricity from the battery into variable-frequency AC electricity to drive the traction motor",
        C: "To mechanically disconnect the differential gears when coasting downhill",
        D: "To pump liquid coolant through the cabin air conditioning condenser"
      },
      correct: "B"
    },
    {
      id: "HEV-09",
      question: "What is the primary role of the DC-DC converter in a hybrid or electric vehicle?",
      options: {
        A: "Translating CAN bus data packets into Ethernet automotive diagnostics",
        B: "Regenerating hydraulic fluid pressure for antilock braking systems",
        C: "Compressing air for pneumatic suspension leveling springs",
        D: "Stepping down the high-voltage traction pack to standard 12V/14V to power vehicle electronics and charge the auxiliary 12V battery"
      },
      correct: "D"
    },
    {
      id: "HEV-10",
      question: "What distinguishes a Plug-in Hybrid Electric Vehicle (PHEV) from a conventional Hybrid Electric Vehicle (HEV)?",
      options: {
        A: "PHEVs do not contain any internal combustion engine",
        B: "PHEVs have larger battery packs that can be recharged from an external electrical grid outlet and provide significant pure electric driving range",
        C: "PHEVs only operate when connected to overhead catenary wires",
        D: "PHEVs must be fueled exclusively with compressed natural gas"
      },
      correct: "B"
    },
    {
      id: "HEV-11",
      question: "What is thermal runaway in lithium-ion battery technology?",
      options: {
        A: "The normal warming of the battery pack during slow overnight Level 1 AC charging",
        B: "The activation of passenger cabin heating elements during sub-zero winter temperatures",
        C: "The rapid evaporation of windshield washer fluid on heated windshield glass",
        D: "An uncontrollable exothermic self-heating reaction where internal cell temperature escalates rapidly, potentially causing fire or venting"
      },
      correct: "D"
    },
    {
      id: "HEV-12",
      question: "In a Parallel Hybrid Electric Vehicle, how can propulsive torque be delivered to the driven wheels?",
      options: {
        A: "Only the electric motor can deliver torque while the engine runs an auxiliary generator",
        B: "Only the engine delivers torque while the electric motor operates the power steering pump",
        C: "Both the internal combustion engine and the electric motor can deliver torque directly to the wheels either independently or together",
        D: "Torque is delivered through hydraulic fluid lines without mechanical driveshafts"
      },
      correct: "C"
    },
    {
      id: "HEV-13",
      question: "Which lithium-ion chemistry is renowned for its superior thermal stability, safety profile, long cycle life, and lower raw material cost despite lower energy density?",
      options: {
        A: "Lithium Iron Phosphate (LFP / LiFePO4)",
        B: "Lithium Cobalt Oxide (LCO)",
        C: "Lithium Nickel Cobalt Aluminum Oxide (NCA)",
        D: "Lithium Manganese Oxide (LMO)"
      },
      correct: "A"
    },
    {
      id: "HEV-14",
      question: "What is the purpose of an interlock circuit (HVIL - High Voltage Interlock Loop) in an electric vehicle?",
      options: {
        A: "To lock vehicle passenger doors automatically when driving above fifteen miles per hour",
        B: "To prevent the driver from selecting reverse gear while cruising on highways",
        C: "To lock the steering wheel column when the vehicle is parked on an incline",
        D: "To detect if any high-voltage connector is loose or disconnected and instantly de-energize the high-voltage system to protect service personnel"
      },
      correct: "D"
    },
    {
      id: "HEV-15",
      question: "What does the term C-rate denote in battery charging and discharging specifications?",
      options: {
        A: "The carbon footprint generated per kilowatt-hour of cell manufacturing",
        B: "A normalized measure of the current at which a battery is charged or discharged relative to its maximum capacity",
        C: "The maximum operating temperature in degrees Celsius before cooling activates",
        D: "The dollar cost per individual cylindrical cell produced"
      },
      correct: "B"
    },
    {
      id: "HEV-16",
      question: "In a series-parallel (power-split) hybrid like the Toyota Prius, what component mechanically splits engine power between the wheels and a generator?",
      options: {
        A: "A torque converter automatic transmission",
        B: "A planetary (epicyclic) gear set",
        C: "A dry multi-plate racing clutch",
        D: "A hydraulic viscous coupling"
      },
      correct: "B"
    },
    {
      id: "HEV-17",
      question: "What is the primary role of a pre-charge circuit in an electric vehicle high-voltage electrical architecture?",
      options: {
        A: "Warming the passenger cabin seats before the driver enters the vehicle",
        B: "Charging the 12V auxiliary lead-acid battery before starting the engine",
        C: "Slowly charging the inverter DC-link capacitor bank through a current-limiting resistor before main contactors close to prevent damaging inrush currents",
        D: "Testing home wall outlet AC grounding resistance before beginning charging"
      },
      correct: "C"
    },
    {
      id: "HEV-18",
      question: "Why are liquid cooling systems commonly preferred over passive air cooling for modern EV high-power fast-charging battery packs?",
      options: {
        A: "Liquid coolant eliminates the need for electrical isolation fuses",
        B: "Liquid cooling reduces the total curb weight of the battery enclosure by half",
        C: "Liquid coolant acts as an electrolyte in case internal pouch cells rupture",
        D: "Liquid cooling provides significantly higher heat transfer coefficients, maintaining uniform cell temperatures and preventing localized hot spots under high current"
      },
      correct: "D"
    },
    {
      id: "HEV-19",
      question: "What does depth of discharge (DoD) signify in battery usage guidelines?",
      options: {
        A: "The physical depth in centimeters of the battery pack mounted below the vehicle floorboard",
        B: "The maximum underwater wading depth the vehicle can navigate safely",
        C: "The percentage of battery capacity that has been discharged relative to its overall capacity",
        D: "The number of hours needed to fully discharge a cell using resistive load banks"
      },
      correct: "C"
    },
    {
      id: "HEV-20",
      question: "What is an electric vehicle creep function designed to simulate for driver ergonomics?",
      options: {
        A: "The automatic lowering of vehicle suspension height during highway cruising",
        B: "The warning sound emitted to pedestrians when moving below 30 km/h",
        C: "The gradual reduction in motor power when battery SoC drops below five percent",
        D: "The gradual forward movement of a traditional automatic transmission vehicle when the brake pedal is released at idle"
      },
      correct: "D"
    }
  ]
}

if (process.argv[1] && process.argv[1].endsWith('build-batch-4.mjs')) {
  applyBatch(batch4Questions)
}
