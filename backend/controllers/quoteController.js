const QuoteRequest = require("../models/QuoteRequest");

async function createQuote(req, res, next) {
  try {
    const quote = await QuoteRequest.create({
      quoteType: req.body.quoteType,
      customer: req.body.customer,
      postcode: req.body.postcode,
      address: req.body.address,
      details: req.body.details || {},
      emergencyFlag: Boolean(req.body.emergencyFlag),
      consent: Boolean(req.body.consent),
      status: req.body.emergencyFlag ? "Priority quote review" : "New quote request"
    });

    return res.status(201).json({
      publicId: quote.publicId,
      quote,
      notification: {
        email: "queued",
        whatsapp: "queued"
      }
    });
  } catch (error) {
    return next(error);
  }
}

async function getQuote(req, res, next) {
  try {
    const quote = await QuoteRequest.findOne({ publicId: req.params.publicId });
    if (!quote) return res.status(404).json({ message: "Quote request not found" });
    return res.json(quote);
  } catch (error) {
    return next(error);
  }
}

async function listQuotes(req, res, next) {
  try {
    const quotes = await QuoteRequest.find().sort({ emergencyFlag: -1, createdAt: -1 }).limit(100);
    return res.json(quotes);
  } catch (error) {
    return next(error);
  }
}

async function updateQuoteStatus(req, res, next) {
  try {
    const quote = await QuoteRequest.findByIdAndUpdate(
      req.params.quoteId,
      { status: req.body.status, assignedEngineer: req.body.engineerId },
      { new: true }
    );
    if (!quote) return res.status(404).json({ message: "Quote request not found" });
    return res.json(quote);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createQuote,
  getQuote,
  listQuotes,
  updateQuoteStatus
};
