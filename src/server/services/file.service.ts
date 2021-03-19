import { S3, ListObjectsCommand, PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";

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
            let uploadParams = {
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

    uploadFile(buff: Buffer) {

    }

    getFile(id: string) {

    }

}

export const fileService = new FileService();