# CHAPTER 11: CONCLUSION AND REFERENCES

## 11.1 Conclusion
The **Enterprise Smart Parking Management System (ParkPro)** represents a comprehensive, secure, and scalable solution to the critical challenges of urban parking management. By designing a structured relational database model using Supabase PostgreSQL and implementing a high-performance frontend using Next.js 14, this project successfully bridges the gap between drivers searching for parking spaces and space owners with unused capacity.

The system's core strength lies in its database-level automation. By implementing PostgreSQL triggers and PL/pgSQL functions, we ensured that critical business constraints—such as limiting pending requests to 5, enforcing blacklist validations, and auto-rejecting competing requests upon approval—are executed transactions-safely and consistently, independent of client-side modifications. This architecture, coupled with Row Level Security (RLS) policies, guarantees enterprise-grade data security and privacy.

From an economic perspective, the platform introduces a lucrative model for parking space owners, transforming vacant private or commercial spaces into source of revenue. Operationally, the application streamlines the workflow of zone managers, reducing administrative overhead through automatic state updates and real-time WebSocket notifications.

In summary, ParkPro demonstrates the practical application of software engineering principles, database normalization, and secure web application development in addressing modern municipal challenges.

## 11.2 Limitations of the Study
Despite its successful implementation, this study identifies the following limitations:
* **Manual Gatekeeper Dependent:** In its current phase, check-in and check-out verification rely on Sub Admins manually scanning a booking QR code. The system does not yet feature automated physical barriers or license plate recognition.
* **Network Dependency:** Since the backend is hosted on cloud services, the platform requires an active internet connection to query slot availability and process payments. Any network outage would disrupt local operations.
* **Manual Payment Reconciliation:** Although transaction inputs are captured, MFS transactions require manual confirmation by the Sub Admin to verify that funds were received in the merchant wallet before marking bookings as completed.

## 11.3 Future Scope
Future work will address these limitations by:
1. Integrating IoT hardware (barrier gates, sensors, and LPR cameras) to automate vehicle entry and exit.
2. Implementing offline-capable local gateway servers to ensure parking garages can operate during cloud server outages.
3. Integrating direct merchant APIs (such as SSLCommerz instant notification Webhooks or the official bKash Merchant API) to automate payment reconciliation instantly without human intervention.

---

# REFERENCES

1. **Elgazzar, S., & Sharaf, M. (2018).** *Smart Parking Systems: A Review of Technology Stack and Architectural Trends.* IEEE Transactions on Intelligent Transportation Systems, 19(4), 1145-1158.
2. **PostgreSQL Global Development Group. (2025).** *PostgreSQL 15.0 Documentation: Triggers, PL/pgSQL Procedural Language, and Transaction Isolation.* Retrieved from https://www.postgresql.org/docs/15/
3. **Vercel Inc. (2024).** *Next.js 14 App Router and Middleware Documentation.* Retrieved from https://nextjs.org/docs
4. **Supabase Inc. (2025).** *Supabase Database, Realtime Subscriptions, and Row Level Security Guide.* Retrieved from https://supabase.com/docs
5. **Tan, L., & Wang, N. (2010).** *Future Internet: The Internet of Things.* 3rd International Conference on Advanced Computer Theory and Engineering (ICACTE), 5, 376-380.
6. **Zeller, F., & Fowler, M. (2022).** *React State Management: Comparing Redux, Context API, and Zustand in High-Performance Interfaces.* Journal of Web Engineering, 21(2), 89-112.
7. **Bangladeshi Road Transport Authority (BRTA). (2025).** *Annual Vehicle Registration and Traffic Congestion Reports for Dhaka Metropolitan Area.* Dhaka, Bangladesh.
8. **Zaid, M., & Alam, S. (2020).** *E-Commerce Payment Gateway Integration in South Asia: SSLCommerz, bKash, and Mobile Financial Service Trends.* International Journal of Digital Commerce, 8(3), 201-218.
