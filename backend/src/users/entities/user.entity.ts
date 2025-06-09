
// import { Role } from '../auth/interface/Role.enum';

// @Entity('users')
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ unique: true })
//   username: string;

//   @Column()
//   firstname: string;

//   @Column()
//   lastname: string;

//   @Column({ unique: true })
//   email: string;

//   @Column()
//   password: string;

//   @Column()
//   phone: string;

//   @Column()
//   country: string;

//   @Column({
//     type: 'enum',
//     enum: Role,
//     default: Role.User,
//   })
//   role: Role;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }
