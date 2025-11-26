-- ========== ENUMS ==========
CREATE TYPE gender_enum AS ENUM ('M', 'F', 'O');
CREATE TYPE role_enum AS ENUM ('admin', 'user');
CREATE TYPE issues_status_enum AS ENUM ('pending', 'in_progress', 'resolved', 'cancelled');
CREATE TYPE weekDays_enum AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
CREATE TYPE pattern_type_enum AS ENUM ('daily', 'weekly', 'monthly');


-- ========== TABLE: Building ==========
CREATE TABLE t_building (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL UNIQUE
);


-- ========== TABLE: Floor ==========
CREATE TABLE t_floor (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  building_id INT NOT NULL REFERENCES t_building(id) ON DELETE CASCADE
);


-- ========== TABLE: Room ==========
CREATE TABLE t_room (
  id SERIAL PRIMARY KEY,
  floor_id INT NOT NULL REFERENCES t_floor(id) ON DELETE CASCADE,
  name VARCHAR(20) NOT NULL,
  capacity INT NOT NULL
);


-- ========== TABLE: User ==========
CREATE TABLE t_user (
  id SERIAL PRIMARY KEY,
  last_name VARCHAR(20) NOT NULL,
  first_name VARCHAR(20) NOT NULL,
  gender gender_enum,
  email VARCHAR(40) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);


-- ========== TABLE: Equipment ==========
CREATE TABLE t_equipment (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);


-- ========== TABLE: Room_Equipment ==========
CREATE TABLE t_room_equipment (
  room_id INT NOT NULL REFERENCES t_room(id),
  equipment_id INT NOT NULL REFERENCES t_equipment(id),
  quantity INT NOT NULL,
  PRIMARY KEY (room_id, equipment_id)
);


-- ========== TABLE: Reservation ==========
CREATE TABLE t_reservation (
  id SERIAL PRIMARY KEY,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  user_id INT NOT NULL REFERENCES t_user(id) ON DELETE SET NULL,
  room_id INT NOT NULL REFERENCES t_room(id) ON DELETE SET NULL,
  CONSTRAINT chk_time CHECK (end_time > start_time)
);


-- ========== TABLE: Recurring_Pattern ==========
CREATE TABLE t_recurring_pattern(
    id SERIAL PRIMARY KEY,
    pattern_type pattern_type_enum NOT NULL,
    interval INT NOT NULL,
    days_of_week weekDays_enum NOT NULL,
    CONSTRAINT chk_days_of_week CHECK (
        pattern_type != 'weekly' OR
        days_of_week IS NOT NULL
    ),
    end_date TIMESTAMP,
    reservation_id INT NOT NULL REFERENCES t_reservation(id) ON DELETE CASCADE
);


-- ========== TABLE: Room_Unavailability ==========
CREATE TABLE t_room_unavailability(
    id SERIAL PRIMARY KEY,
    room_id INT NOT NULL REFERENCES t_room(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    reason TEXT,
    CONSTRAINT chk_unavailability_time CHECK (end_time > start_time)
);


-- ========== TABLE: Issue ==========
CREATE TABLE t_issue (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES t_user(id) ON DELETE SET NULL,
    room_id INT NOT NULL REFERENCES t_room(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    status issues_status_enum DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE t_contain_ressource (
    PRIMARY KEY (room_id, equipment_id),
    room_id INT NOT NULL REFERENCES t_room(id),
    equipment_id INT NOT NULL REFERENCES t_equipment(id),
    quantity INT NOT NULL
);


CREATE TABLE t_favorite(
    user_id INT NOT NULL REFERENCES t_user(id) ON DELETE CASCADE,
    room_id INT NOT NULL REFERENCES t_room(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, room_id)
);

-- ===========================
--  TEST DATA
-- ===========================

-- Buildings
INSERT INTO t_building (name) VALUES
  ('Building A'),
  ('Building B');


-- Floors
INSERT INTO t_floor (building_id, name) VALUES
  (1, 'RDC'),
  (1, '1er étage'),
  (2, 'RDC');

-- Rooms
INSERT INTO t_room (floor_id, name, capacity) VALUES
  (1, 'A0.01', 10),
  (1, 'A1.12', 15),
  (2, 'B0.05', 50);

-- Equipments
INSERT INTO t_equipment (name) VALUES
  ('Projector'),
  ('Whiteboard'),
  ('HDMI Cable'),
  ('Speaker System');

-- Room <-> Equipments
INSERT INTO t_room_equipment (room_id, equipment_id, quantity) VALUES
  (1, 1, 1),
  (1, 2, 1),
  (2, 1, 1),
  (2, 3, 1);

-- Users
INSERT INTO t_user (last_name, first_name, gender, email, password_hash) VALUES
  ('SCHENK', 'Hugo', 'M', 'hugo@example.com', 'pwd'),
  ('NAVETTE', 'Antoine', 'M', 'antoine@example.com', 'pwd'),
  ('KOLETZKI', 'Livia', 'F', 'livia@example.com', 'pwd');

-- Reservations
INSERT INTO t_reservation (user_id, room_id, start_time, end_time) VALUES
  (1, 1, '2025-01-10 10:00', '2025-01-10 12:00'),
  (2, 2, '2025-01-11 14:00', '2025-01-11 16:00'),
  (3, 3, '2025-01-12 09:00', '2025-01-12 11:00');

-- Issues
INSERT INTO t_issue (user_id, room_id, description) VALUES
  (1, 1, 'Projector not working'),
  (2, 2, 'Chairs broken');