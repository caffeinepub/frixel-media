import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // UserRole based on authorization component
  type UserRole = AccessControl.UserRole;

  // ContactMessage type and compare function
  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Int; // Nanoseconds since epoch
  };

  module ContactMessage {
    public func compare(msg1 : ContactMessage, msg2 : ContactMessage) : Order.Order {
      if (msg2.timestamp > msg1.timestamp) {
        #less;
      } else if (msg2.timestamp < msg1.timestamp) {
        #greater;
      } else { #equal };
    };
  };

  // PortfolioItem type and compare function
  type PortfolioItem = {
    id : Nat;
    title : Text;
    description : Text;
    category : Text;
    imageUrl : Text;
    createdAt : Int; // Nanoseconds since epoch
  };

  module PortfolioItem {
    public func compare(item1 : PortfolioItem, item2 : PortfolioItem) : Order.Order {
      if (item2.createdAt > item1.createdAt) {
        #less;
      } else if (item2.createdAt < item1.createdAt) {
        #greater;
      } else { #equal };
    };
  };

  // Testimonial type
  type Testimonial = {
    id : Nat;
    clientName : Text;
    company : Text;
    message : Text;
    rating : Nat; // 1-5
    isVisible : Bool;
  };

  // Extended UserProfile type
  public type ExtendedUserProfile = {
    principal : Principal;
    displayName : Text;
    roleLabel : Text;
    userRole : UserRole;
  };

  var nextContactId = 1;
  var nextPortfolioId = 1;
  var nextTestimonialId = 1;

  let contactMessages = Map.empty<Nat, ContactMessage>();
  let portfolioItems = Map.empty<Nat, PortfolioItem>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let userProfiles = Map.empty<Principal, ExtendedUserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Helper function to check if caller is admin or moderator (user with elevated privileges)
  func isAdminOrModerator(caller : Principal) : Bool {
    AccessControl.isAdmin(accessControlState, caller) or AccessControl.hasPermission(accessControlState, caller, #user);
  };

  // Public submit - no authorization required
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, phone : Text, message : Text) : async Nat {
    let id = nextContactId;
    nextContactId += 1;

    let contact : ContactMessage = {
      id;
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };

    contactMessages.add(id, contact);
    id;
  };

  // Admin/moderator can read all messages
  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not isAdminOrModerator(caller)) {
      Runtime.trap("Unauthorized: Only admins and moderators can view contact messages");
    };
    let messages = contactMessages.values().toArray();
    messages.sort();
  };

  // Admin only can delete
  public shared ({ caller }) func deleteContactMessage(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete contact messages");
    };
    if (not contactMessages.containsKey(id)) {
      Runtime.trap("Contact message not found");
    };
    contactMessages.remove(id);
  };

  // Admin/moderator can create
  public shared ({ caller }) func createPortfolioItem(title : Text, description : Text, category : Text, imageUrl : Text) : async Nat {
    if (not isAdminOrModerator(caller)) {
      Runtime.trap("Unauthorized: Only admins and moderators can create portfolio items");
    };

    let item : PortfolioItem = {
      id = nextPortfolioId;
      title;
      description;
      category;
      imageUrl;
      createdAt = Time.now();
    };
    portfolioItems.add(item.id, item);
    nextPortfolioId += 1;
    item.id;
  };

  // Public can read all
  public query ({ caller }) func getAllPortfolioItems() : async [PortfolioItem] {
    let items = portfolioItems.values().toArray();
    items.sort();
  };

  // Admin/moderator can update
  public shared ({ caller }) func updatePortfolioItem(id : Nat, title : Text, description : Text, category : Text, imageUrl : Text) : async () {
    if (not isAdminOrModerator(caller)) {
      Runtime.trap("Unauthorized: Only admins and moderators can update portfolio items");
    };

    let existing = switch (portfolioItems.get(id)) {
      case (null) { Runtime.trap("Portfolio item not found") };
      case (?item) { item };
    };

    let updated : PortfolioItem = {
      id = existing.id;
      title;
      description;
      category;
      imageUrl;
      createdAt = existing.createdAt;
    };

    portfolioItems.add(id, updated);
  };

  // Admin/moderator can delete
  public shared ({ caller }) func deletePortfolioItem(id : Nat) : async () {
    if (not isAdminOrModerator(caller)) {
      Runtime.trap("Unauthorized: Only admins and moderators can delete portfolio items");
    };

    switch (portfolioItems.get(id)) {
      case (null) { Runtime.trap("Portfolio item not found") };
      case (?_) {
        portfolioItems.remove(id);
      };
    };
  };

  // Admin/moderator can create
  public shared ({ caller }) func addTestimonial(clientName : Text, company : Text, message : Text, rating : Nat, isVisible : Bool) : async Nat {
    if (not isAdminOrModerator(caller)) {
      Runtime.trap("Unauthorized: Only admins and moderators can add testimonials");
    };

    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let id = nextTestimonialId;
    let testimonial : Testimonial = {
      id;
      clientName;
      company;
      message;
      rating;
      isVisible;
    };

    testimonials.add(id, testimonial);
    nextTestimonialId += 1;
    id;
  };

  // Public can read visible ones
  public query ({ caller }) func getVisibleTestimonials() : async [Testimonial] {
    testimonials.values().filter(func(t : Testimonial) : Bool { t.isVisible }).toArray();
  };

  // Admin/moderator can toggle visibility
  public shared ({ caller }) func modifyTestimonialVisibility(id : Nat, isVisible : Bool) : async () {
    if (not isAdminOrModerator(caller)) {
      Runtime.trap("Unauthorized: Only admins and moderators can modify testimonial visibility");
    };

    switch (testimonials.get(id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?testimonial) {
        testimonials.add(id, {
          id = testimonial.id;
          clientName = testimonial.clientName;
          company = testimonial.company;
          message = testimonial.message;
          rating = testimonial.rating;
          isVisible;
        });
      };
    };
  };

  // User can create their own profile
  public shared ({ caller }) func createUserProfile(displayName : Text, roleLabel : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create profiles");
    };

    let userRole = AccessControl.getUserRole(accessControlState, caller);

    let profile : ExtendedUserProfile = {
      principal = caller;
      displayName;
      roleLabel;
      userRole;
    };
    userProfiles.add(caller, profile);
  };

  // User can get their own role
  public query ({ caller }) func getUserRole() : async UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  // Admin can set user roles
  public shared ({ caller }) func setUserRole(user : Principal, newRole : UserRole) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can set user roles");
    };

    // Update in access control system
    AccessControl.assignRole(accessControlState, caller, user, newRole);

    // Update in user profile if exists
    switch (userProfiles.get(user)) {
      case (null) { /* Profile doesn't exist yet, that's ok */ };
      case (?profile) {
        let updatedProfile = {
          principal = user;
          displayName = profile.displayName;
          roleLabel = profile.roleLabel;
          userRole = newRole;
        };
        userProfiles.add(user, updatedProfile);
      };
    };
  };

  // Admin can list all users and their roles
  public query ({ caller }) func getAllUserProfiles() : async [ExtendedUserProfile] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can list all user profiles");
    };
    userProfiles.values().toArray();
  };

  // Get caller's own profile
  public query ({ caller }) func getCallerUserProfile() : async ?ExtendedUserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  // Save caller's own profile
  public shared ({ caller }) func saveCallerUserProfile(displayName : Text, roleLabel : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    let userRole = AccessControl.getUserRole(accessControlState, caller);

    let profile : ExtendedUserProfile = {
      principal = caller;
      displayName;
      roleLabel;
      userRole;
    };
    userProfiles.add(caller, profile);
  };

  // Get another user's profile (admin only or own profile)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?ExtendedUserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };
};
