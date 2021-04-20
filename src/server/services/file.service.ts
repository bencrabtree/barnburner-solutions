import {
    S3,
    S3ClientConfig,
    PutObjectCommandInput
} from "@aws-sdk/client-s3";
import { getConnection } from "typeorm";
import { File } from '../../shared/dao/';

class FileService {
    s3: S3;
    bucketName: string;
    urlPrefix: string;

    constructor() {}

    initialize(settings) {
        let config: S3ClientConfig = {
            region: settings.region,
            credentials: {
                accessKeyId: settings.accessKey,
                secretAccessKey: settings.accessSecret
            }
        };
        this.urlPrefix = settings.url;
        this.bucketName = settings.bucketName;
        // this.s3 = new S3Client(config);
        this.s3 = new S3(config);
        console.log('Initialized s3')
    }

    async getArtistPhotos(artistName: string) {
        try {
            let uploadParams = {
                Key: encodeURIComponent(artistName) + '/',
                Bucket: this.bucketName,
              }
            const data = await this.s3.listObjects(uploadParams);
            return data;
        } catch (error) {
            console.log('[FileService] getArtistPhotos:', error)
        }
    }

    async getPhoto(key: string) {
        try {
            let uploadParams = {
                Key: key,
                Bucket: this.bucketName,
            }
            const data = await this.s3.getObject(uploadParams);
            return data;
        } catch (error) {
            console.log('[FileService] getPhoto:', error)
        }
    }

    async uploadPhoto(file: any, artistName: string) {
        try {
            let uploadParams: PutObjectCommandInput = {
                Bucket: this.bucketName,
                Key: encodeURIComponent(artistName) + '/' + file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype
            }
            await this.s3.putObject(uploadParams);
            return this.urlPrefix + uploadParams.Key;
        } catch (error) {
            console.log('[FileService] uploadPhoto:', error)
        }
    }

    async uploadUserPhoto(file: any, email: string) {
        try {
            let uploadParams: PutObjectCommandInput = {
                Bucket: this.bucketName,
                Key: 'User' + email,
                Body: file,
                ContentType: ""
            }
            await this.s3.putObject(uploadParams);
            return this.urlPrefix + uploadParams.Key;
        } catch (error) {
            console.log('[FileService] uploadPhoto:', error)
        }
    }

    async deletePhoto(id: string, artistName: string) {
        try {
            let file: File = await getConnection()
                .getRepository(File)
                .createQueryBuilder('file')
                .where({ id })
                .execute();

            let params = {
                Bucket: this.bucketName,
                Key: encodeURIComponent(artistName) + '/' + file.name
            };

            this.s3.deleteObject(params);
            return true;
        } catch (error) {
            console.log('[FileService] Delete:', error);
            return null;
        }

    }

    uploadFile(buff: Buffer) {

    }

    getFile(id: string) {

    }

}

export const fileService = new FileService();