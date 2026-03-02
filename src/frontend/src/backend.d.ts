import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ExtendedUserProfile {
    userRole: UserRole;
    principal: Principal;
    displayName: string;
    roleLabel: string;
}
export interface ContactMessage {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface PortfolioItem {
    id: bigint;
    title: string;
    createdAt: bigint;
    description: string;
    imageUrl: string;
    category: string;
}
export interface Testimonial {
    id: bigint;
    clientName: string;
    company: string;
    message: string;
    isVisible: boolean;
    rating: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addTestimonial(clientName: string, company: string, message: string, rating: bigint, isVisible: boolean): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPortfolioItem(title: string, description: string, category: string, imageUrl: string): Promise<bigint>;
    createUserProfile(displayName: string, roleLabel: string): Promise<void>;
    deleteContactMessage(id: bigint): Promise<void>;
    deletePortfolioItem(id: bigint): Promise<void>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllPortfolioItems(): Promise<Array<PortfolioItem>>;
    getAllUserProfiles(): Promise<Array<ExtendedUserProfile>>;
    getCallerUserProfile(): Promise<ExtendedUserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<ExtendedUserProfile | null>;
    getUserRole(): Promise<UserRole>;
    getVisibleTestimonials(): Promise<Array<Testimonial>>;
    isCallerAdmin(): Promise<boolean>;
    modifyTestimonialVisibility(id: bigint, isVisible: boolean): Promise<void>;
    saveCallerUserProfile(displayName: string, roleLabel: string): Promise<void>;
    setUserRole(user: Principal, newRole: UserRole): Promise<void>;
    submitContactMessage(name: string, email: string, phone: string, message: string): Promise<bigint>;
    updatePortfolioItem(id: bigint, title: string, description: string, category: string, imageUrl: string): Promise<void>;
}
