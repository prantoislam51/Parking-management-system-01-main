# CHAPTER 2: LITERATURE REVIEW AND FEASIBILITY ANALYSIS

## 2.1 Literature Review of Existing Systems
In recent years, several approaches have been explored to address the urban parking crisis. These approaches can be broadly classified into three categories:

### 2.1.1 Traditional Parking Management
Traditional parking systems rely heavily on human labor. Upon entering a parking area, the driver receives a paper ticket from a guard. When exiting, the guard calculates the elapsed time manually and collects cash.
* **Limitations:** This model is highly inefficient, leading to long queues at entry and exit gates. It offers zero visibility to external drivers, meaning a driver has no way of knowing if the parking lot is full until they arrive. Furthermore, it is highly prone to financial errors and manual revenue leakages.

### 2.1.2 Hardware-Intensive IoT Parking Systems
These systems install hardware sensors (such as ultrasonic, magnetic, or infrared sensors) at every individual parking slot, connected to a local gateway. The status of each slot is transmitted to LED displays or a central server.
* **Limitations:** While highly accurate, the cost of purchasing, installing, and maintaining thousands of physical sensors is extremely high. In countries like Bangladesh, where road dust, high temperatures, and monsoon flooding are common, physical sensors are prone to frequent breakdowns, making them economically unfeasible for large-scale municipal deployment.

### 2.1.3 Web-Based Reservation Platforms
Web-based platforms use a software-centric approach. Parking spot owners register their spaces, and drivers book them via a web page or mobile app.
* **Limitations:** Many existing web-based solutions are too simplistic. They do not handle complex approval flows (e.g., letting a zone manager review a driver's details and vehicle license before allowing them in), nor do they offer hierarchical controls for local governments. Furthermore, they lack strict security controls, leading to potential data breaches where one user can view or cancel another user's bookings.

ParkPro addresses these gaps by combining a software-centric, cost-effective web platform with advanced database constraints, automatic RLS security policies, and a strict administrative hierarchy that models real-world municipalities.

## 2.2 Urban Parking Challenges in Bangladesh and Megacities
Megacities in developing countries face unique challenges that make standard smart parking models difficult to deploy:

1. **High Vehicle Density vs. Low Land Availability:** Cities like Dhaka have a population density exceeding 23,000 people per square kilometer, with road space accounting for less than 8% of the city's total area. Constructing new dedicated parking structures is financially and physically impossible in major business hubs like Motijheel, Gulshan, or Kawran Bazar.
2. **Growth of the Shared Economy:** The rise of ride-sharing services and corporate car ownership has increased the need for short-term and mid-term parking spots during office hours, while residential parking spots remain vacant.
3. **Lack of Integrated Digital Payments:** Historically, digital payments were low in Bangladesh. However, with the explosive growth of Mobile Financial Services (MFS) like bKash and Nagad, which now process billions of Taka daily, the population is ready for cashless digital transactions. ParkPro leverages this readiness by integrating MFS options into the booking checkout.
4. **Administrative Complexity:** Municipal corporations (like Dhaka North and South City Corporations) operate under complex geographical and political divisions. A smart parking system must reflect this hierarchy so that ward counselors or zone officials (Sub Admins) can manage their specific jurisdictions without interfering with others.

## 2.3 Feasibility Analysis
Before proceeding with the implementation of ParkPro, a comprehensive feasibility study was conducted across three main dimensions: Technical, Economic, and Operational.

### 2.3.1 Technical Feasibility
The technical feasibility evaluates whether the selected technology stack is capable of meeting the project requirements.
* **Frontend (Next.js 14 & TypeScript):** Next.js App Router provides Server-Side Rendering (SSR) for fast initial page loads (beneficial for SEO on the landing page) and Client-Side Rendering (CSR) for interactive dashboards. TypeScript ensures type safety, preventing common runtime errors.
* **Backend (Supabase & PostgreSQL):** Supabase acts as a highly scalable backend. PostgreSQL is an enterprise-grade relational database capable of handling complex transactions. PostgreSQL's support for custom PL/pgSQL triggers and Row Level Security (RLS) ensures that the critical business rules and security policies are enforced directly at the database layer rather than the application code, making the system robust and language-agnostic.
* **Real-time Sync (Supabase Realtime):** Allows dashboards to update slot statuses and booking requests instantaneously using WebSockets, without requiring constant API polling, saving server resources.

Therefore, the project is highly feasible technically.

### 2.3.2 Economic Feasibility
Economic feasibility assesses the financial viability, development costs, and expected return on investment (ROI).
* **Development Cost:** By using open-source technologies (Next.js, Tailwind CSS) and a cloud database service (Supabase free/developer tier), the initial development cost is extremely low. No expensive hardware sensors are required.
* **Operational Costs:** Cloud hosting costs are minimal and scale dynamically based on user traffic.
* **Revenue Generation:** The system generates revenue through booking commissions and cancellation fees. A simple financial projection shows that a single parking zone with 50 slots, operating at a conservative 60% occupancy rate, can cover its development and hosting costs within the first two months of operation.

Thus, the project is highly feasible economically.

### 2.3.3 Operational Feasibility
Operational feasibility measures how well the system will be accepted by users and managers in their daily routines.
* **User Acceptance:** The user interface is designed with mobile responsiveness, clean typography (Inter, Plus Jakarta Sans), and clear status badges. Since booking a slot takes less than 30 seconds and payment is integrated with familiar MFS (bKash/Nagad), drivers will adopt it easily.
* **Manager Acceptance:** Sub Admins (parking attendants or building managers) are provided with a dedicated dashboard that lists pending requests and active bookings. The system automates repetitive tasks (such as auto-rejecting conflicting requests and updating slot statuses), reducing their cognitive load.
* **Super Admin Control:** City administrators have full auditing capabilities, ensuring that any actions taken by Sub Admins are logged, preventing bribery or unauthorized spot allocation.

Therefore, the system is operationally feasible.

## 2.4 Environmental and Social Impact
Beyond direct economic benefits, ParkPro delivers a positive environmental and social impact:
* **Reduction in Air Pollution:** By eliminating the need for drivers to cruise looking for parking, the system significantly reduces emissions of Carbon Dioxide (CO2), Nitrogen Oxides (NOx), and particulate matter (PM2.5).
* **Reduction in Noise Pollution:** Less cruising translates to fewer traffic bottlenecks and a corresponding reduction in vehicle honking, making city centers quieter and more liveable.
* **Public Safety:** Unsupervised parking on narrow streets often blocks emergency vehicles (ambulances, fire trucks). By moving vehicles into designated, pre-booked slots, streets remain clear and emergency response times improve.
* **Data-Driven Urban Planning:** The data collected by ParkPro (occupancy rates, peak booking hours, high-demand areas) can be shared with city planning departments to optimize future road development and public transit routes.
