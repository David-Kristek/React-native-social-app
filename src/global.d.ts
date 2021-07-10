declare global {
  type Comment = { text: string; commentedByUser: otherUser };
  type Method = "GET" | "POST" | "DELETE" | "PUT";
  type User = null | { username: string; email: string; picture: string; };
  interface Category {
    name: string;
    _id: string;
    approved: boolean;
    createdByUser: {
      name: string;
    };
  }
  interface FormDataValue {
    uri: string;
    name: string;
    type: string;
  }
  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void;
    set(name: string, value: FormDataValue, fileName?: string): void;
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
    createdByUser: otherUser;
    createdAt: Date;
    dateInString: string; 
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
