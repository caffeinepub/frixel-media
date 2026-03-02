# Frixel Media Website

## Current State
New project. No existing pages or backend.

## Requested Changes (Diff)

### Add
- Multi-page corporate website for Frixel Media (digital marketing agency)
- Pages: Home, Services, Packages, Portfolio, About, Contact
- Role-based auth system with 4 roles: Admin, Moderator, Team Coordinator, Subordinate
- Contact form submissions stored in backend
- Portfolio items stored and managed in backend
- Testimonials stored in backend
- Sticky header with navigation
- Floating WhatsApp button (+91 9144741759)
- Footer with logo, quick links, contact info, social icons

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend
- `User` type with roles: #admin, #moderator, #teamCoordinator, #subordinate
- Auth: register/login with role management (admin can assign roles)
- `ContactMessage` type: name, email, phone, message, timestamp
- `PortfolioItem` type: title, description, category, imageUrl, createdAt
- `Testimonial` type: clientName, company, message, rating
- CRUD for portfolio items (admin/moderator)
- Submit contact form (public)
- Get testimonials (public)
- Get portfolio items (public)
- Admin dashboard data: user list, contact messages

### Frontend Pages

**Home Page**
- Hero: "Grow Faster. Scale Smarter." with CTA buttons (Get Free Strategy Call, View Services)
- Subtle hero animation
- Performance statement: Performance Focused, Data Driven, ROI Optimized, Growth Engine Approach
- 6 service preview cards with hover animation
- Packages preview (Starter/Growth/Premium tiers with CTA)
- Why Choose Frixel Media (5 points)
- Testimonials section

**Services Page**
- 6 detailed service sections: Social Media Management, Meta Ads, Google Ads, Branding & Creative, Video & Reels, Website Development
- Each: Problem, Solution, What We Deliver, Expected Results, CTA

**Packages Page**
- 5 package tiers: Mini Nova (₹5,500), Catalyst (₹13,500), Ascend Pro (₹22,500), Elite Nexus (₹55,000), Apex Hub (₹75,000)
- Full details per package with scope, complimentary, not included, ads budget policy
- Closing CTA section with the brand philosophy message

**Portfolio Page**
- Clean grid with hover animation
- Filter by category
- Dynamic data from backend

**About Page**
- Mission, Vision, Approach
- "A Unit of Frixel International" section

**Contact Page**
- Contact form (name, email, phone, message)
- WhatsApp quick chat button
- Map embed placeholder
- Contact details

**Auth / Dashboard**
- Login page
- Role-based dashboard (admin sees all messages/users, others see relevant views)

### Design
- White base, charcoal black (#1C1C1C), bold gold accent (#C6A437)
- Bold sans-serif headlines, clean modern body font
- Smooth scroll, sticky header, floating WhatsApp button
- World-class animations: hero parallax, scroll-triggered reveals, card hovers
