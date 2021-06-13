declare global {
    type Comment = { text: string; commentedByUser: otherUser };
    type Method = "GET" | "POST" | "DELETE" | "PUT";
    interface Category {
      name: string;
      _id: string;
      approved: boolean;
      createdByUser: {
        name: string;
      };
    }
    interface Post {
      _id: string;
      location: {
        x: number;
        y: number;
        label: string;
      };
      categories: Category[];
      images: string[];
      name: string;
      description: string;
      createdByUser: User;
      createdAt: Date;
      likedByUsers: otherUser[];
      comments: Comment[];
    }
  
    type otherUser = {
      name: string;
      email: string;
      image: string;
      createdAt: Date | null;
    };
    type mapCoors = {
      x: number;
      y: number;
    };
  }
  export {};