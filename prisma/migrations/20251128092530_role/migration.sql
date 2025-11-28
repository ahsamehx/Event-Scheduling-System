-- AlterTable
ALTER TABLE "invitations" ADD COLUMN     "role_in_event" "role_in_event" NOT NULL DEFAULT 'attendee';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" VARCHAR(20) NOT NULL DEFAULT 'user';
