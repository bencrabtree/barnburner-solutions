import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";
import { Artist, User } from ".";
import { fileService } from "../../server/services/file.service";
import { FileTypes } from "../util/types";

@Entity()
export class File extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("character varying")
    file_path: string;

    @Column("character varying", { nullable: true })
    name: string;

    @Column({ type: "enum", enum: FileTypes, nullable: false })
    type: FileTypes;

    @UpdateDateColumn({ type: "timestamp without time zone"})
    upload_date;

    @ManyToOne(type => Artist, artist => artist.photo)
    artist: Artist;

    async upload(file: any, artistName?: string) {
        this.type = file.mimetype;
        this.file_path = await fileService.uploadPhoto(file, this.artist?.full_name || artistName);
        this.name = encodeURIComponent(this.artist?.full_name || artistName) + '/' + file.originalname;
        this.save();
    }

    async uploadUserPhoto(file: any, email: string) {
        this.file_path = await fileService.uploadUserPhoto(file, email);
        this.save();
    }
}
