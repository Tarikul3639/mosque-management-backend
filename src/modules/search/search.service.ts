import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async globalSearch(query: string) {
    if (!query || query.trim() === '') {
      return { users: [], projects: [], families: [] };
    }

    const searchTerm = query.trim();

    // Parallel search across multiple models using Prisma
    const [users, projects] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { email: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        select: { id: true, name: true, email: true, role: true },
        take: 5,
      }),
      this.prisma.project.findMany({
        where: {
          title: { contains: searchTerm, mode: 'insensitive' },
        },
        select: { id: true, title: true, status: true },
        take: 5,
      }),
    ]);

    return {
      users,
      projects,
    };
  }
}