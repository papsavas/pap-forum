type SegmentProps = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

type XOR<T1, T2> =
	| ({
		[K in keyof T1]: T1[K];
	} & {
			[K in keyof T2]?: never;
		})
	| ({
		[K in keyof T2]: T2[K];
	} & {
			[K in keyof T1]?: never;
		});

type Nullable<T> = { [K in keyof T]: T[K] | null };

type QueryOptions<T> = {
	columns?: { [K in keyof Partial<T>]: boolean },
	limit?: number,
	offset?: number
}