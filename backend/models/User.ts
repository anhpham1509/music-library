import {Table, Column, Model, PrimaryKey} from 'sequelize-typescript'; 

@Table({
    timestamps: true
})
export class User extends Model<User>{
    @PrimaryKey
    @Column
    id: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    name: string;
}