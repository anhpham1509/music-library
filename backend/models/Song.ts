import {Table, Column, Model, PrimaryKey} from 'sequelize-typescript'; 

@Table({
    timestamps: true
})
export class Song extends Model<Song>{
    @PrimaryKey
    @Column
    id: string;

    @Column
    title: string;

    @Column
    artist: string;

    @Column
    cover: string;

    @Column
    url: string;
}