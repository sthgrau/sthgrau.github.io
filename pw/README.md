Working page: https://sthgrau.github.io/pw/

This is the result of wondering if you could have your password in plain sight, and yet still be somewhat secure. This is a solution to that.

The most interesting part of this for me was figuring out if you could arrange numbers, letters and symbols in a way that any contiguous X character string necessarily contains at least one member of the standard 4 classes for passwords. I didn't end up with a theory, but I did find a pattern that works.

This is a proof of concept. It is seeded from a file of random data from random.org. The characters were chosen based on eliminating ambiguous characters, and trying to conserve as many bits as reasonable. The reason for the latter is that I was looking to use random.org's API, but there is a limit of 250000 bits a day. Even a modest amount of traffic would go through this budget quickly. So, I am only using digits 1-8 and 8 symbols. I ended up switching to using an 8MB file downloaded from the same site. This had the immediate benefit of making it easier to duplicate the particular table. Otherwise, all of the random data would need to be included in the URL to display it again. Whereas random.org provides one file a day at this size, so in the future, you may specify a day and an offset.

This demo shows a table of 16x16 characters. The number of 8 character-length strings is 738. That is, for each line and column, there are 9 combinations that can be read either one way or the reverse (576). The diagonals offer a series: 2*1 + 2*2 ... 2*8 + 9 (162).

The coloring was an attempt to make it easier to remember the starting point, when trying to retrieve the password. The table lines act as a kind of binary tree to remember the general area (ie: ur (upper right), bl (bottom left), ul (upper left), which leads to a set of 4 squares with a unique color, say 'red'. From there is a limited number of directions, say bottom right. That password is pretty random given the input data, yet I think the process is easier for a person to remember than the completely random data.

Fwiw, I noticed that the combination of table lines and square colors comes close to being unique in itself. Changing the pattern of the square colors, using shifting or mirroring, could potentially make each 4 squares unique, and therefore give another means of remembering the right one.

I'd like to be able to scroll up, down, left and right; every point would then have as many directions as any other point. As is, in the corners, those 4 characters only have 6 different possible passwords with it being the start or end, but one in the center has 16. I can see that working in one axis, but not two.

