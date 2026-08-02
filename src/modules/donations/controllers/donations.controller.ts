import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Res,
    UseGuards,
} from "@nestjs/common";
import type { Response } from "express";

import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";

import { Roles } from "@/common/decorators/roles.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

import { UserRole } from "@/lib/prisma/client";

import { CreateDonationDto } from "../dto/requests/create-donation.dto";
import { DonationQueryDto } from "../dto/requests/donation-query.dto";
import { DonationSummaryQueryDto } from "../dto/requests/donation-summary-query.dto";
import { DonorHistoryQueryDto } from "../dto/requests/donor-history-query.dto";
import { UpdateDonationDto } from "../dto/requests/update-donation.dto";

import { DonationListResponseDto } from "../dto/responses/donation-list-response.dto";
import { DonationResponseDto } from "../dto/responses/donation-response.dto";
import { DonationSummaryResponseDto } from "../dto/responses/donation-summary-response.dto";
import { DonorHistoryResponseDto } from "../dto/responses/donor-history-response.dto";

import { CreateDonationService } from "../services/create-donation.service";
import { DeleteDonationService } from "../services/delete-donation.service";
import { GenerateDonationReceiptService } from "../services/generate-donation-receipt.service";
import { GetDonationService } from "../services/get-donation.service";
import { GetDonationSummaryService } from "../services/get-donation-summary.service";
import { GetDonorHistoryService } from "../services/get-donor-history.service";
import { ListDonationsService } from "../services/list-donations.service";
import { UpdateDonationService } from "../services/update-donation.service";

@ApiTags("Donations")
@Controller("donations")
export class DonationsController {
    constructor(
        private readonly createDonationService: CreateDonationService,
        private readonly updateDonationService: UpdateDonationService,
        private readonly deleteDonationService: DeleteDonationService,
        private readonly getDonationService: GetDonationService,
        private readonly listDonationsService: ListDonationsService,
        private readonly getDonationSummaryService: GetDonationSummaryService,
        private readonly getDonorHistoryService: GetDonorHistoryService,
        private readonly generateDonationReceiptService: GenerateDonationReceiptService,
    ) { }

    // -----------------------------
    // Public APIs
    // -----------------------------

    @Get()
    @ApiOperation({
        summary: "Get donation list",
    })
    @ApiResponse({
        status: 200,
        type: DonationListResponseDto,
    })
    async findAll(
        @Query() query: DonationQueryDto,
    ): Promise<DonationListResponseDto> {
        return this.listDonationsService.execute(query);
    }

    @Get("summary")
    @ApiOperation({
        summary: "Get donation summary",
    })
    @ApiResponse({
        status: 200,
        type: DonationSummaryResponseDto,
    })
    async summary(
        @Query() query: DonationSummaryQueryDto,
    ): Promise<DonationSummaryResponseDto> {
        return this.getDonationSummaryService.execute(query);
    }

    @Get("donor/history")
    @ApiOperation({
        summary: "Get donor donation history",
    })
    @ApiResponse({
        status: 200,
        type: DonorHistoryResponseDto,
    })
    async donorHistory(
        @Query() query: DonorHistoryQueryDto,
    ): Promise<DonorHistoryResponseDto> {
        return this.getDonorHistoryService.execute(query);
    }

    @Get(":id/receipt")
    @ApiOperation({
        summary: "Download donation receipt",
    })
    @ApiResponse({
        status: 200,
        description: "PDF receipt",
    })
    async downloadReceipt(
        @Param("id") id: string,
        @Res() res: Response,
    ): Promise<void> {
        const { fileName, buffer } =
            await this.generateDonationReceiptService.execute(id);

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${fileName}"`,
            "Content-Length": buffer.length,
        });

        res.end(buffer);
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get donation details",
    })
    @ApiResponse({
        status: 200,
        type: DonationResponseDto,
    })
    async findOne(
        @Param("id") id: string,
    ): Promise<DonationResponseDto> {
        return this.getDonationService.execute(id);
    }

    // -----------------------------
    // Protected APIs
    // -----------------------------

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @ApiOperation({
        summary: "Create donation",
    })
    @ApiResponse({
        status: 201,
        type: DonationResponseDto,
    })
    async create(
        @CurrentUser() user: {
            sub: string;
            email: string;
            role: UserRole;
        },
        @Body() dto: CreateDonationDto,
    ): Promise<DonationResponseDto> {
        return this.createDonationService.execute(dto, user.sub);
    }

    @Patch(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @ApiOperation({
        summary: "Update donation",
    })
    @ApiResponse({
        status: 200,
        type: DonationResponseDto,
    })
    async update(
        @CurrentUser() user: {
            sub: string;
            email: string;
            role: UserRole;
        },
        @Param("id") id: string,
        @Body() dto: UpdateDonationDto,
    ): Promise<DonationResponseDto> {
        return this.updateDonationService.execute(id, dto, user.sub);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @ApiOperation({
        summary: "Delete donation",
    })
    @ApiResponse({
        status: 200,
    })
    async delete(
        @Param("id") id: string,
    ): Promise<void> {
        return this.deleteDonationService.execute(id);
    }
}