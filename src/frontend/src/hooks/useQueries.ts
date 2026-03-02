import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserRole } from "../backend.d";
import { useActor } from "./useActor";

// ========== Testimonials ==========
export function useGetVisibleTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["testimonials", "visible"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVisibleTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientName,
      company,
      message,
      rating,
      isVisible,
    }: {
      clientName: string;
      company: string;
      message: string;
      rating: bigint;
      isVisible: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTestimonial(
        clientName,
        company,
        message,
        rating,
        isVisible,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useModifyTestimonialVisibility() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      isVisible,
    }: { id: bigint; isVisible: boolean }) => {
      if (!actor) throw new Error("Not connected");
      return actor.modifyTestimonialVisibility(id, isVisible);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

// ========== Portfolio ==========
export function useGetAllPortfolioItems() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPortfolioItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePortfolioItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      category,
      imageUrl,
    }: {
      title: string;
      description: string;
      category: string;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createPortfolioItem(title, description, category, imageUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });
}

export function useUpdatePortfolioItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      title,
      description,
      category,
      imageUrl,
    }: {
      id: bigint;
      title: string;
      description: string;
      category: string;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePortfolioItem(
        id,
        title,
        description,
        category,
        imageUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });
}

export function useDeletePortfolioItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deletePortfolioItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });
}

// ========== Contact ==========
export function useSubmitContactMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(name, email, phone, message);
    },
  });
}

export function useGetAllContactMessages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteContactMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteContactMessage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
    },
  });
}

// ========== User / Auth ==========
export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["user-role"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllUserProfiles() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["user-profiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUserProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      displayName,
      roleLabel,
    }: {
      displayName: string;
      roleLabel: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(displayName, roleLabel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
}

export function useSetUserRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      user,
      newRole,
    }: {
      user: Principal;
      newRole: UserRole;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.setUserRole(user, newRole);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profiles"] });
    },
  });
}
