import { Test, TestingModule } from '@nestjs/testing';
import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';
import { Schema as MongooSchema } from 'mongoose';
import * as Chance from 'chance';
import { createAuthorInput } from '../author/author.service.spec';
import { createUserInput } from '../user/user.service.spec';
import { Asset } from './entities/asset.entity';

const DESCRIPTION_LENGTH = 20;

const chance = new Chance();
let bookId = new MongooSchema.Types.ObjectId('');

const createBookInput: CreateAssetInput = {
  author: new MongooSchema.Types.ObjectId(''),
  coverImage: chance.url(),
  description: chance.string({ length: DESCRIPTION_LENGTH }),
  isbn: chance.string(),
  price: 12.09,
  title: chance.string({ length: 10 }),
};

const updateBookInput: UpdateAssetInput = {
  _id: new MongooSchema.Types.ObjectId(''),
  coverImage: chance.url(),
  price: 20.99,
};

describe('BookResolver', () => {
  let resolver: AssetResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetResolver,
        {
          provide: AssetService,
          useValue: {
            createBook: jest.fn(() => {
              return {
                _id: bookId,
                ...createBookInput,
              };
            }),
            findAllBooks: jest.fn(() => {
              return {
                books: [
                  {
                    ...createBookInput,
                    author: {
                      ...createAuthorInput,
                      _id: createBookInput.author,
                    },
                    readers: [],
                    _id: bookId,
                  },
                ],
                booksCount: 1,
              };
            }),
            getBookById: jest.fn(() => {
              return {
                ...createBookInput,
                _id: bookId,
                readers: [],
                author: {
                  _id: createBookInput.author,
                  ...createAuthorInput,
                },
              };
            }),
            updateBook: jest.fn(() => {
              return {
                _id: bookId,
                ...createBookInput,
                ...updateBookInput,
              };
            }),
            removeBook: jest.fn(() => {
              return {};
            }),
            buyBook: jest.fn(() => {
              return {
                ...createBookInput,
                readers: [{ ...createUserInput }],
              };
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<AssetResolver>(AssetResolver);
  });

  it('should be able to create a book', async () => {
    const book = await resolver.createAsset(createBookInput);

    expect(book).toBeDefined();
    expect(book.title).toBe(createBookInput.title);
    expect(book.description.length).toBe(DESCRIPTION_LENGTH);

    bookId = book._id;
    updateBookInput._id = book._id;
  });

  it('should get a list of books, paginated', async () => {
    const books = await resolver.findAll({ limit: 10, skip: 0 });

    expect(books.booksCount).toBe(1);
    expect(books.books[0].title).toBe(createBookInput.title);
    expect(books.books[0].author.name).toBe(createAuthorInput.name);
    expect(books.books[0].readers.length).toBe(0);
  });

  it('should get a book by its id', async () => {
    const book = await resolver.findOne({
      limit: 10,
      skip: 0,
      _id: updateBookInput._id,
    });

    expect(book.title).toBe(createBookInput.title);
    expect(book.price).toBe(createBookInput.price);
    expect(book.author).toBeDefined();
    expect(book.readers.length).toBeLessThanOrEqual(10); // 10 is the limit
    expect(book.readers.length).toBe(0);
  });

  it('should be able to update a book', async () => {
    const updatedBook = await resolver.updateAsset(updateBookInput);

    expect(updatedBook.coverImage).not.toBe(createBookInput.coverImage);
    expect(updatedBook.coverImage).toBe(updateBookInput.coverImage);
    expect(updatedBook.price).toBe(updateBookInput.price);

    // the rest of the book details remain the same
    expect(updatedBook.title).toBe(createBookInput.title);
  });

  it('should remove the book', async () => {
    const removedBook = resolver.removeAsset(bookId);
    expect(removedBook).toBeDefined();
  });

  it('should throw an error when getting a removed user', async () => {
    try {
      await resolver.findOne({ skip: 0, limit: 10, _id: bookId });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response).toBeDefined();
      expect(error.response.statusCode).toBe(404);
    }
  });

  it('should allow a user to buy a new book', async () => {
    const updatedBook: Asset = await resolver.buyAsset({
      bookId: updateBookInput._id,
      userId: new MongooSchema.Types.ObjectId(''),
    });

    expect(updatedBook.readers.length).toBe(1);
    expect(updatedBook.readers[0].name).toBe(createUserInput.name);
  });
});
