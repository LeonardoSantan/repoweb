-- Script SQL para inserir dados básicos e fakes nas tabelas principais
-- Ajuste os nomes dos campos e tabelas conforme seu modelo real

-- Usuário admin
INSERT INTO users (id, name, email, password, "createdAt", "updatedAt") VALUES
  (1, 'Admin User', 'admin@admin.com', '$2a$10$7QyP0wzYw8/6a7d9b1uG8eK9zLQyJZqv6hU8Qn9xE4T1dBf0nF6Gq', NOW(), NOW()); -- senha: admin123

-- Pacientes
INSERT INTO patients (id, first_name, last_name, phone, email, address, date_of_birth, "createdAt", "updatedAt") VALUES
  ('11111111-1111-1111-1111-111111111111', 'João', 'Silva', '11999999999', 'joao@pac.com', 'Rua A, 123', '1990-05-15', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'Maria', 'Souza', '11888888888', 'maria@pac.com', 'Rua B, 456', '1985-09-22', NOW(), NOW());

-- Bloco removido: tabela doctors não existe

-- Especialidades
INSERT INTO specialties (id, name, description, "createdAt", "updatedAt") VALUES
  ('33333333-3333-3333-3333-333333333333', 'Cardiologia', 'Especialidade do coração', NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'Dermatologia', 'Especialidade da pele', NOW(), NOW());

-- Relação Médico-Especialidade
-- Substitua pelos UUIDs reais de médicos e especialidades cadastrados
INSERT INTO doctor_specialties (doctor_id, specialty_id, since) VALUES
  ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', NOW()),
  ('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', NOW());

-- Agendamentos
-- Substitua pelos UUIDs reais de pacientes, médicos e clínicas cadastrados
INSERT INTO appointments (id, patient_id, doctor_id, clinic_id, scheduled_at, notes, status, "createdAt", "updatedAt") VALUES
  ('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666666', '2025-07-10 10:00:00', 'Consulta rotina', 'scheduled', NOW(), NOW());

-- Bloco removido: tabela clinics não existe

-- Observação: para o MongoDB (prontuarios), use um script JS separado ou insira via aplicação.
-- Senha padrão para todos: admin123 (hash gerado pelo bcrypt para facilitar testes)
