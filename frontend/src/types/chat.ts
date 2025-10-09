export interface ChatUser {
  id: string;
  name: string;
  image?: string;
  isMentor: boolean;
  isConnected?: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  isMentor: boolean;
  message: string;
  type: 'text' | 'system' | 'file';
  fileUrl?: string;
  fileName?: string;
  timestamp: Date | string;
  roomId: string;
}

export interface JoinRoomPayload {
  roomId: string;
}

export interface LeaveRoomPayload {
  roomId: string;
}

export interface SendMessagePayload {
  roomId: string;
  message: string;
  type?: 'text' | 'system' | 'file';
  fileUrl?: string;
  fileName?: string;
}

export interface UserConnectedEvent {
  userId: string;
  userName: string;
  userImage?: string;
  isMentor: boolean;
  socketId: string;
}

export interface UserDisconnectedEvent {
  userId: string;
  userName: string;
  socketId: string;
}

export interface JoinSuccessEvent {
  roomId: string;
  userId: string;
}

export interface JoinDeniedEvent {
  reason:
    | 'INVALID_TOKEN'
    | 'RESERVATION_NOT_FOUND'
    | 'NOT_IN_TIME_WINDOW'
    | 'NOT_PARTICIPANT'
    | 'SERVER_ERROR';
}

export interface JoinRoomResponse {
  status: 'waiting' | 'progress' | 'closed';
  roomId: string;
}
