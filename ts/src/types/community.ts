export interface PostData {
  _id: number;
  type: string;
  title: string;
  content: string;
  views: number;
  user: {
    _id: number;
    name: string;
    profile?: string | { originalname: string; name: string; path: string };
  };
	createdAt: string,
	updatedAt: string,
	seller_id: null | number,
	extra: null | object,
	repliesCount: number,
	product:{
		image: null
	}
}
